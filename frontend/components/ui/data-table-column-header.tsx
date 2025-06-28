'use client';

import * as React from 'react';
import { Column } from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  filterOptions?: {
    label: string;
    value: string;
  }[];
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  filterOptions,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [filterSearch, setFilterSearch] = React.useState('');
  const [selectedValues, setSelectedValues] = React.useState<Set<string>>(new Set());

  const sortingState = column.getIsSorted();
  const canSort = column.getCanSort();
  const canFilter = !!filterOptions && filterOptions.length > 0;

  // Initialize selected values from column filter state
  React.useEffect(() => {
    const filterValue = column.getFilterValue();
    if (Array.isArray(filterValue)) {
      setSelectedValues(new Set(filterValue));
    }
  }, [column]);

  const handleSort = () => {
    if (!canSort) return;
    
    if (sortingState === false) {
      column.toggleSorting(false);
    } else if (sortingState === 'asc') {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  };

  const handleFilterToggle = (value: string, checked: boolean) => {
    const newSet = new Set(selectedValues);
    if (checked) {
      newSet.add(value);
    } else {
      newSet.delete(value);
    }
    setSelectedValues(newSet);
    
    // Apply filter immediately
    const values = Array.from(newSet);
    column.setFilterValue(values.length > 0 ? values : undefined);
  };

  const handleFilterClear = () => {
    setSelectedValues(new Set());
    column.setFilterValue(undefined);
    setFilterSearch('');
  };

  const handleSelectAll = () => {
    const filteredOptions = filterOptions?.filter(option =>
      option.label.toLowerCase().includes(filterSearch.toLowerCase())
    ) || [];
    
    if (selectedValues.size === filteredOptions.length) {
      // Deselect all
      setSelectedValues(new Set());
      column.setFilterValue(undefined);
    } else {
      // Select all
      const allValues = new Set(filteredOptions.map(opt => opt.value));
      setSelectedValues(allValues);
      column.setFilterValue(Array.from(allValues));
    }
  };

  const filteredOptions = filterOptions?.filter(option =>
    option.label.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const isFiltered = selectedValues.size > 0;

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={handleSort}
        disabled={!canSort}
      >
        <span>{title}</span>
        {canSort && (
          <>
            {sortingState === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
            {sortingState === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
            {sortingState === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </>
        )}
      </Button>
      
      {canFilter && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'h-8 w-8 p-0',
                  isFiltered && 'bg-accent text-accent-foreground'
                )}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <div className="p-2">
                <Input
                  placeholder="Search filters..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="h-8"
                />
              </div>
              <DropdownMenuSeparator />
              
              {filteredOptions && filteredOptions.length > 0 && (
                <>
                  <DropdownMenuCheckboxItem
                    checked={selectedValues.size === filteredOptions.length}
                    onCheckedChange={handleSelectAll}
                  >
                    Select All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                </>
              )}
              
              <div className="max-h-[200px] overflow-y-auto">
                {filteredOptions?.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={selectedValues.has(option.value)}
                    onCheckedChange={(checked) => handleFilterToggle(option.value, checked)}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
              
              {isFiltered && (
                <>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-full"
                      onClick={handleFilterClear}
                    >
                      Clear filters
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isFiltered && (
            <Badge variant="secondary" className="h-6 px-1.5">
              {selectedValues.size}
            </Badge>
          )}
        </>
      )}
    </div>
  );
}