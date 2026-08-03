/**
 * Pattern: Search Bar / 搜索栏
 * Purpose / 用途: Top search bar for list/table pages with leading icon, input, and clear/loading trailing
 *   列表/表格页面顶部的搜索栏，含前置图标、输入框、清除/加载尾部
 * Archetype: list-table, data-explorer
 */

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar({ placeholder = 'Search... / 搜索...', onSearch, isLoading = false }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleClear = () => {
    setValue('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-[var(--color-text-muted)]" aria-hidden="true">
        {/* MingCute search icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </span>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-10"
      />
      {value && !isLoading && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1"
          onClick={handleClear}
          aria-label="Clear search / 清除搜索"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </Button>
      )}
      {isLoading && (
        <span className="absolute right-3">
          <svg className="animate-spin h-4 w-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      )}
    </div>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽            | Component / 组件    | Token Ref / 引用                |
 * |------------------------|---------------------|---------------------------------|
 * | Container / 容器       | div relative        | flex items-center               |
 * | Leading icon / 前置    | svg                 | currentColor inherit            |
 * | Input / 输入框         | Input (shadcn)      | neutral focus halo              |
 * | Clear btn / 清除       | Button ghost icon   | must have aria-label            |
 * | Loading / 加载态       | animate-spin svg    | replaces clear button           |
 *
 * Notes / 注意: No submit button (Enter triggers search) / 不加 submit 按钮（回车触发）
 */
