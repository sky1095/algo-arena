#!/usr/bin/env node
/**
 * Adds Dart starter code to all problem files.
 * For each problem, finds the Java starter, extracts the method signature,
 * generates a Dart starter, and inserts it after the cpp: entry in the starter block.
 */
import fs from 'fs';
import path from 'path';

const PROBLEMS_DIR = path.resolve('src/lib/data/problems');

function javaTypeToDart(type) {
  return type
    .replace(/List<List<Integer>>/g, 'List<List<int>>')
    .replace(/List<Integer>/g, 'List<int>')
    .replace(/List<String>/g, 'List<String>')
    .replace(/Set<Integer>/g, 'Set<int>')
    .replace(/Set<String>/g, 'Set<String>')
    .replace(/Map<Integer,\s*Integer>/g, 'Map<int, int>')
    .replace(/Map<Integer,\s*List<Integer>>/g, 'Map<int, List<int>>')
    .replace(/Map<String,\s*Integer>/g, 'Map<String, int>')
    .replace(/Map<String,\s*String>/g, 'Map<String, String>')
    .replace(/int\[\]\[\]/g, 'List<List<int>>')
    .replace(/int\[\]/g, 'List<int>')
    .replace(/String\[\]/g, 'List<String>')
    .replace(/boolean\[\]/g, 'List<bool>')
    .replace(/char\[\]/g, 'List<String>')
    .replace(/double\[\]/g, 'List<double>')
    .replace(/ListNode(?!\?)/g, 'ListNode?')
    .replace(/TreeNode(?!\?)/g, 'TreeNode?')
    .replace(/Node(?!\?)/g, 'Node?')
    .replace(/\bboolean\b/g, 'bool')
    .replace(/\bchar\b/g, 'String')
    .replace(/\bString\b/g, 'String')
    .replace(/\bint\b/g, 'int')
    .replace(/\bdouble\b/g, 'double')
    .replace(/\blong\b/g, 'int')
    .replace(/\bvoid\b/g, 'void');
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('dart:')) return false;

  // Strategy: Find each starter block, find the cpp: entry, add dart: after it.
  // We work with the raw text, not AST.
  
  // Find all starter blocks and their Java signatures
  const result = [];
  const lines = content.split('\n');
  
  let inStarter = false;
  let starterDepth = 0;
  let foundCppInStarter = false;
  let javaSig = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track starter blocks
    if (/^\s*starter:\s*\{/.test(line)) {
      inStarter = true;
      starterDepth = 0;
      foundCppInStarter = false;
      javaSig = null;
    }
    
    if (inStarter) {
      for (const ch of line) {
        if (ch === '{') starterDepth++;
        if (ch === '}') starterDepth--;
      }
      if (starterDepth <= 0) inStarter = false;
      
      // Capture Java signature (may span multiple lines)
      if (!javaSig && line.includes('java:')) {
        // Collect up to 5 lines to find the public method
        let block = line;
        for (let j = 1; j <= 5 && i + j < lines.length; j++) {
          block += '\n' + lines[i + j];
        }
        const m = block.match(/public\s+(\S+)\s+(\w+)\(([^)]*)\)/);
        if (m) {
          const dartReturn = javaTypeToDart(m[1]);
          const methodName = m[2];
          const rawParams = m[3].trim();
          const dartParams = rawParams ? rawParams.split(',').map(p => {
            const parts = p.trim().split(/\s+/);
            if (parts.length < 2) return p.trim();
            return `${javaTypeToDart(parts.slice(0, -1).join(' '))} ${parts[parts.length - 1]}`;
          }).join(', ') : '';
          javaSig = `class Solution {\n  ${dartReturn} ${methodName}(${dartParams}) {\n    \n  }\n}`;
        }
      }
      
      // After cpp: in starter block, insert dart:
      if (!foundCppInStarter && /^\s*cpp:/.test(line) && javaSig) {
        // Check if cpp: entry is single-line (has closing backtick on same line)
        const backtickCount = (line.match(/`/g) || []).length;
        if (backtickCount >= 2) {
          // Single-line cpp: entry
          result.push(line);
          const indent = line.match(/^(\s*)/)[1];
          result.push(`${indent}dart: \`${javaSig}\`,`);
        } else {
          // Multi-line cpp: entry - collect until closing backtick
          let multiLine = line;
          while (i + 1 < lines.length && !lines[i + 1].includes('`,')) {
            multiLine += '\n' + lines[++i];
          }
          if (i + 1 < lines.length) multiLine += '\n' + lines[++i];
          result.push(multiLine);
          const indent = multiLine.match(/^(\s*)/)[1];
          result.push(`${indent}dart: \`${javaSig}\`,`);
        }
        foundCppInStarter = true;
        continue;
      }
    }
    
    result.push(line);
  }
  
  const newContent = result.join('\n');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    return true;
  }
  return false;
}

console.log('Adding Dart starters to all problem files...\n');

const files = fs.readdirSync(PROBLEMS_DIR)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts')
  .sort()
  .map(f => path.join(PROBLEMS_DIR, f));

let updated = 0;
for (const file of files) {
  if (processFile(file)) {
    console.log(`  UPDATED: ${path.basename(file)}`);
    updated++;
  } else {
    console.log(`  SKIP: ${path.basename(file)}`);
  }
}

console.log(`\nDone! Updated ${updated}/${files.length} files.`);
