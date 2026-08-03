/**
 * Pattern: Code Block / 代码块
 * Purpose / 用途: Code snippet display with syntax highlighting and copy button
 *   代码片段展示，支持语法高亮和复制
 * Archetype: ai-chat-interface, entity-detail, report-analysis
 */

import { useState } from 'react';
import { CodeBlock as AgCodeBlock } from '@/components/ag/code-block';
import { Button } from '@/components/ui/button';

export function CodeBlock({ code, language, showHeader = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AgCodeBlock language={language} showHeader={showHeader}>
      {showHeader && (
        <div className="flex items-center justify-between px-[var(--space-3)] py-[var(--space-2)] border-b border-[var(--color-border-subtle)]">
          {language && (
            <span className="text-[length:var(--font-size-caption)] text-[var(--color-text-muted)]">
              {language}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            aria-label={copied ? 'Copied / 已复制' : 'Copy code / 复制代码'}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      )}
      <pre>
        <code>{code}</code>
      </pre>
    </AgCodeBlock>
  );
}

/*
 * Locked Recipe / 锁定配方:
 * | Slot / 插槽            | Component / 组件    | Token Ref / 引用                    |
 * |------------------------|---------------------|-------------------------------------|
 * | Container / 容器       | AgCodeBlock         | --font-mono, --radius-sm            |
 * | Header / 头部          | div flex            | language label + copy button        |
 * | Language / 语言标签    | span                | --color-text-muted                  |
 * | Copy btn / 复制按钮    | Button ghost sm     | compact variant                     |
 *
 * Syntax highlight tokens (fixed) / 语法高亮 token（固定不变）:
 * - CodeKeyword  → blue  (--color-code-keyword)
 * - CodeString   → green (--color-code-string)
 * - CodeComment  → gray  (--color-code-comment)
 * - CodeFunction → (--color-code-fn)
 * - CodeNumber   → orange (--color-code-number)
 */
