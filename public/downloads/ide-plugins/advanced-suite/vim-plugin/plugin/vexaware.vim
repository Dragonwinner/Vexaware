" VEX Aware Vim Plugin
" Author: VEX Aware Team
" Version: 2.0.0
" Description: Advanced VEX document support for Vim/Neovim

if exists('g:loaded_vexaware')
  finish
endif
let g:loaded_vexaware = 1

" Configuration
let g:vexaware_enable_ai = get(g:, 'vexaware_enable_ai', 0)
let g:vexaware_api_endpoint = get(g:, 'vexaware_api_endpoint', 'https://api.vexaware.com/v2')
let g:vexaware_auto_validate = get(g:, 'vexaware_auto_validate', 1)

" File type detection
augroup vexaware_filetype
  autocmd!
  autocmd BufRead,BufNewFile *.vex set filetype=vex
  autocmd BufRead,BufNewFile *.vex.json set filetype=json.vex
augroup END

" Syntax highlighting for VEX files
augroup vexaware_syntax
  autocmd!
  autocmd FileType vex,json.vex call s:SetupVexSyntax()
augroup END

function! s:SetupVexSyntax()
  " JSON base syntax
  runtime! syntax/json.vim
  
  " VEX-specific highlighting
  syntax match vexContext /@context/
  syntax match vexId /@id/
  syntax match vexCVE /CVE-\d\{4\}-\d\{4,\}/
  syntax match vexPURL /pkg:[a-zA-Z][a-zA-Z0-9+.-]*\/[^"]\+/
  
  syntax keyword vexStatus affected not_affected fixed under_investigation
  syntax keyword vexJustification component_not_present vulnerable_code_not_present 
        \ vulnerable_code_not_in_execute_path vulnerable_code_cannot_be_controlled_by_adversary
        \ inline_mitigations_already_exist
  
  " Highlighting colors
  highlight link vexContext Special
  highlight link vexId Identifier
  highlight link vexCVE Constant
  highlight link vexPURL String
  highlight link vexStatus Keyword
  highlight link vexJustification Type
endfunction

" VEX document templates
function! VexCreateBasicTemplate()
  let template = [
        \ '{',
        \ '  "@context": "https://openvex.dev/ns",',
        \ '  "@id": "' . input('Document ID: ', 'https://example.com/vex/doc-' . strftime('%Y%m%d')) . '",',
        \ '  "author": "' . input('Author: ', $USER) . '",',
        \ '  "timestamp": "' . strftime('%Y-%m-%dT%H:%M:%SZ') . '",',
        \ '  "version": "1.0.0",',
        \ '  "statements": [',
        \ '    {',
        \ '      "vulnerability": {',
        \ '        "name": "' . input('CVE ID: ', 'CVE-2024-') . '",',
        \ '        "@id": "https://cve.mitre.org/cgi-bin/cvename.cgi?name=' . @" . '"',
        \ '      },',
        \ '      "products": [',
        \ '        {',
        \ '          "@id": "' . input('Product PURL: ', 'pkg:npm/package@1.0.0') . '",',
        \ '          "identifiers": {',
        \ '            "purl": "' . @" . '"',
        \ '          }',
        \ '        }',
        \ '      ],',
        \ '      "status": "not_affected",',
        \ '      "justification": "component_not_present",',
        \ '      "impact_statement": "This vulnerability does not affect the product.",',
        \ '      "action_statement": "No action required."',
        \ '    }',
        \ '  ]',
        \ '}'
        \ ]
  
  call setline(1, template)
  call cursor(1, 1)
endfunction

" VEX validation function
function! VexValidateDocument()
  if !exists('*json_decode')
    echo "Error: JSON support required for validation"
    return
  endif
  
  let content = join(getline(1, '$'), "\n")
  
  try
    let vex_doc = json_decode(content)
    
    let errors = []
    
    " Basic validation
    if !has_key(vex_doc, '@context')
      call add(errors, 'Missing required property: @context')
    endif
    
    if !has_key(vex_doc, 'statements')
      call add(errors, 'Missing required property: statements')
    endif
    
    if has_key(vex_doc, 'statements') && type(vex_doc.statements) == type([])
      for i in range(len(vex_doc.statements))
        let stmt = vex_doc.statements[i]
        
        if !has_key(stmt, 'vulnerability')
          call add(errors, 'Statement ' . i . ': Missing vulnerability')
        endif
        
        if !has_key(stmt, 'products')
          call add(errors, 'Statement ' . i . ': Missing products')
        endif
        
        if !has_key(stmt, 'status')
          call add(errors, 'Statement ' . i . ': Missing status')
        endif
      endfor
    endif
    
    if empty(errors)
      echo "✓ VEX document is valid"
    else
      echo "✗ VEX validation errors:"
      for error in errors
        echo "  - " . error
      endfor
    endif
    
  catch
    echo "✗ Invalid JSON: " . v:exception
  endtry
endfunction

" AI-powered VEX generation (requires external API)
function! VexGenerateWithAI()
  if !g:vexaware_enable_ai
    echo "AI features are disabled. Set g:vexaware_enable_ai = 1 to enable."
    return
  endif
  
  let vulnerability = input('Vulnerability ID: ', 'CVE-2024-')
  if empty(vulnerability)
    return
  endif
  
  let product = input('Product identifier: ', 'pkg:npm/')
  if empty(product)
    return
  endif
  
  echo "Generating VEX document with AI..."
  
  " This would make an API call in a real implementation
  " For now, we'll use the basic template
  call VexCreateBasicTemplate()
endfunction

" Dependency scanning
function! VexScanDependencies()
  echo "Scanning project dependencies..."
  
  let package_files = []
  call add(package_files, findfile('package.json', '.;'))
  call add(package_files, findfile('pom.xml', '.;'))
  call add(package_files, findfile('requirements.txt', '.;'))
  call add(package_files, findfile('Cargo.toml', '.;'))
  
  let found_files = filter(package_files, 'v:val != ""')
  
  if empty(found_files)
    echo "No dependency files found in project"
    return
  endif
  
  echo "Found dependency files:"
  for file in found_files
    echo "  - " . file
  endfor
  
  " In a real implementation, this would analyze dependencies
  " and check for known vulnerabilities
endfunction

" Auto-validation on save
augroup vexaware_auto_validate
  autocmd!
  if g:vexaware_auto_validate
    autocmd BufWritePost *.vex,*.vex.json call VexValidateDocument()
  endif
augroup END

" Key mappings
nnoremap <leader>vv :call VexValidateDocument()<CR>
nnoremap <leader>vn :call VexCreateBasicTemplate()<CR>
nnoremap <leader>va :call VexGenerateWithAI()<CR>
nnoremap <leader>vs :call VexScanDependencies()<CR>

" Commands
command! VexValidate call VexValidateDocument()
command! VexNewTemplate call VexCreateBasicTemplate()
command! VexGenerateAI call VexGenerateWithAI()
command! VexScanDeps call VexScanDependencies()

" Text objects for VEX documents
vnoremap <silent> av :<C-U>call <SID>SelectVexDocument()<CR>
onoremap <silent> av :call <SID>SelectVexDocument()<CR>

function! s:SelectVexDocument()
  " Select entire VEX document (JSON object)
  normal! gg
  call search('{', 'W')
  normal! v%
endfunction

" Folding for VEX documents
function! VexFoldExpr(lnum)
  let line = getline(a:lnum)
  
  if line =~ '^\s*"statements":'
    return '>1'
  elseif line =~ '^\s*{\s*$' && getline(a:lnum + 1) =~ '^\s*"vulnerability":'
    return '>2'
  elseif line =~ '^\s*}\s*,\?\s*$'
    return '<' . (indent(a:lnum) / &shiftwidth + 1)
  endif
  
  return '='
endfunction

augroup vexaware_folding
  autocmd!
  autocmd FileType vex,json.vex setlocal foldmethod=expr foldexpr=VexFoldExpr(v:lnum)
augroup END

" Status line integration
function! VexStatusLine()
  if &filetype == 'vex' || &filetype == 'json.vex'
    return '[VEX]'
  endif
  return ''
endfunction

" Completion for VEX properties
function! VexComplete(findstart, base)
  if a:findstart
    " Find the start of the current word
    let line = getline('.')
    let start = col('.') - 1
    
    while start > 0 && line[start - 1] =~ '[a-zA-Z_@]'
      let start -= 1
    endwhile
    
    return start
  else
    " Return completion items
    let completions = [
          \ '@context', '@id', 'author', 'timestamp', 'version',
          \ 'statements', 'vulnerability', 'products', 'status',
          \ 'justification', 'impact_statement', 'action_statement',
          \ 'affected', 'not_affected', 'fixed', 'under_investigation',
          \ 'component_not_present', 'vulnerable_code_not_present'
          \ ]
    
    return filter(completions, 'v:val =~ "^" . a:base')
  endif
endfunction

augroup vexaware_completion
  autocmd!
  autocmd FileType vex,json.vex setlocal omnifunc=VexComplete
augroup END

echo "VEX Aware plugin loaded. Use :help vexaware for documentation."