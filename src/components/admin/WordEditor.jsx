import { useState, useRef, useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  Unlink,
  Highlighter,
  Palette,
  Undo,
  Redo,
  RemoveFormatting,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Minus,
  Sparkles,
  Upload,
  Eye,
  Edit3,
  BookOpen,
} from 'lucide-react'
import { compressImage } from '../../utils/imageOptimizer'
import api from '../../utils/api'

export default function WordEditor({
  value = '',
  onChange = () => {},
  placeholder = 'Start writing your blog article here or paste from Microsoft Word...',
  minHeight = '380px',
}) {
  const editorRef = useRef(null)
  const isInternalChange = useRef(false)

  // Fullscreen & Preview State
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  // Active command states
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
    insertUnorderedList: false,
    insertOrderedList: false,
  })

  // Color Pickers
  const [showTextColorPicker, setShowTextColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)

  // Link Modal State
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const savedSelection = useRef(null)

  // Image Modal State
  const [imageUrl, setImageUrl] = useState('')
  const [imageCaption, setImageCaption] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)

  // Word & Character Count
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  // Text Color Options
  const textColors = [
    { label: 'White / Default', value: '#FFFFFF', color: '#FFFFFF' },
    { label: 'Amber Brand', value: '#FD9800', color: '#FD9800' },
    { label: 'Dark Charcoal', value: '#0F172A', color: '#0F172A' },
    { label: 'Gold Accent', value: '#F59E0B', color: '#F59E0B' },
    { label: 'Crimson Red', value: '#EF4444', color: '#EF4444' },
    { label: 'Emerald Green', value: '#10B981', color: '#10B981' },
    { label: 'Sky Blue', value: '#38BDF8', color: '#38BDF8' },
    { label: 'Muted Slate', value: '#94A3B8', color: '#94A3B8' },
  ]

  // Highlight Colors
  const highlightColors = [
    { label: 'None', value: 'transparent', color: 'transparent' },
    { label: 'Warm Yellow', value: '#FEF08A', color: '#FEF08A' },
    { label: 'Amber Glow', value: '#FED7AA', color: '#FED7AA' },
    { label: 'Mint Green', value: '#BBF7D0', color: '#BBF7D0' },
    { label: 'Soft Sky', value: '#BAE6FD', color: '#BAE6FD' },
    { label: 'Soft Lavender', value: '#E9D5FF', color: '#E9D5FF' },
    { label: 'Rose Pink', value: '#FECDD3', color: '#FECDD3' },
  ]

  // Initialize or update content when value changes externally
  useEffect(() => {
    if (!editorRef.current) return
    if (isInternalChange.current) {
      isInternalChange.current = false
      return
    }
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
      calculateCounts(value || '')
    }
  }, [value])

  // Calculate words and characters
  const calculateCounts = (html) => {
    const temp = document.createElement('div')
    temp.innerHTML = html
    const text = temp.innerText || temp.textContent || ''
    const trimmed = text.trim()
    setCharCount(trimmed.length)
    setWordCount(trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0)
  }

  // Update active states on selection change
  const updateActiveStates = () => {
    try {
      setActiveStates({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
        justifyFull: document.queryCommandState('justifyFull'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
      })
    } catch {
      // ignore
    }
  }

  // Execute formatting command
  const execCmd = (cmd, val = null) => {
    if (!editorRef.current) return
    editorRef.current.focus()
    document.execCommand(cmd, false, val)
    handleEditorInput()
    updateActiveStates()
  }

  // Handle Input in editor
  const handleEditorInput = () => {
    if (!editorRef.current) return
    const html = editorRef.current.innerHTML
    isInternalChange.current = true
    calculateCounts(html)
    onChange(html)
  }

  // Save current selection for modals
  const saveSelection = () => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0)
    }
  }

  // Restore saved selection
  const restoreSelection = () => {
    if (savedSelection.current) {
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(savedSelection.current)
    }
  }

  // Open link modal
  const openLinkModal = () => {
    saveSelection()
    const sel = window.getSelection()
    setLinkText(sel ? sel.toString() : '')
    setLinkUrl('')
    setShowLinkModal(true)
  }

  // Insert Link
  const applyLink = (e) => {
    e.preventDefault()
    if (!linkUrl) {
      setShowLinkModal(false)
      return
    }
    restoreSelection()
    const validUrl = /^https?:\/\//i.test(linkUrl) ? linkUrl : `https://${linkUrl}`

    if (linkText && savedSelection.current && savedSelection.current.collapsed) {
      // If no text was selected, insert link element with text
      const linkElem = `<a href="${validUrl}" target="_blank" rel="noopener noreferrer" style="color: #FD9800; text-decoration: underline; font-weight: 600;">${linkText}</a>`
      document.execCommand('insertHTML', false, linkElem)
    } else {
      document.execCommand('createLink', false, validUrl)
      // Enhance created link attributes
      const sel = window.getSelection()
      if (sel && sel.anchorNode) {
        const anchor = sel.anchorNode.parentElement?.closest('a')
        if (anchor) {
          anchor.target = '_blank'
          anchor.rel = 'noopener noreferrer'
          anchor.style.color = '#FD9800'
          anchor.style.textDecoration = 'underline'
          anchor.style.fontWeight = '600'
        }
      }
    }
    handleEditorInput()
    setShowLinkModal(false)
  }

  // Remove Link
  const removeLink = () => {
    execCmd('unlink')
  }

  // Insert Scripture Callout Block
  const insertScriptureBox = () => {
    const quoteHtml = `
      <blockquote style="margin: 1.5rem 0; padding: 1.25rem 1.5rem; background-color: rgba(253, 152, 0, 0.08); border-left: 4px solid #FD9800; border-radius: 4px; font-style: italic; color: #FEF9E1;">
        <p style="margin: 0; font-size: 1.1rem; line-height: 1.7;">“Enter scripture or inspiring quote here...”</p>
        <cite style="display: block; margin-top: 0.5rem; font-size: 0.85rem; font-weight: bold; color: #FD9800; font-style: normal; text-transform: uppercase; letter-spacing: 1px;">— Reference / Author</cite>
      </blockquote>
      <p><br></p>
    `
    execCmd('insertHTML', quoteHtml)
  }

  // Insert Horizontal Line
  const insertDivider = () => {
    execCmd('insertHorizontalRule')
  }

  // Apply Heading
  const applyHeading = (tag) => {
    if (!tag || tag === 'p') {
      execCmd('formatBlock', '<p>')
    } else {
      execCmd('formatBlock', `<${tag}>`)
    }
  }

  // Insert Image from modal
  const applyImage = (e) => {
    e.preventDefault()
    if (!imageUrl) {
      setShowImageModal(false)
      return
    }
    restoreSelection()
    const imgHtml = `
      <figure style="margin: 1.75rem 0; text-align: center;">
        <img src="${imageUrl}" alt="${imageCaption || 'Article Photo'}" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 0 auto;" />
        ${imageCaption ? `<figcaption style="margin-top: 0.5rem; font-size: 0.8rem; color: #94A3B8; font-style: italic;">${imageCaption}</figcaption>` : ''}
      </figure>
      <p><br></p>
    `
    execCmd('insertHTML', imgHtml)
    setShowImageModal(false)
    setImageUrl('')
    setImageCaption('')
  }

  // Handle Image Upload directly inside editor
  const handleDirectImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploadingImage(true)
      const compressed = await compressImage(file, 1600, 1200, 0.82)
      const res = await api.uploadImage(compressed)
      if (res.success && res.url) {
        setImageUrl(res.url)
      }
    } catch (err) {
      alert(`Image upload failed: ${err.message}`)
    } finally {
      setUploadingImage(false)
      if (e.target) e.target.value = ''
    }
  }

  // Keyboard shortcut listener
  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          execCmd('bold')
          break
        case 'i':
          e.preventDefault()
          execCmd('italic')
          break
        case 'u':
          e.preventDefault()
          execCmd('underline')
          break
        case 'k':
          e.preventDefault()
          openLinkModal()
          break
        case 'z':
          if (e.shiftKey) {
            e.preventDefault()
            execCmd('redo')
          } else {
            e.preventDefault()
            execCmd('undo')
          }
          break
        case 'y':
          e.preventDefault()
          execCmd('redo')
          break
        default:
          break
      }
    }
  }

  return (
    <div
      className={`border border-slate-700/80 rounded-2xl bg-[#080E1A] overflow-hidden flex flex-col transition-all duration-200 ${
        isFullscreen
          ? 'fixed inset-4 z-[9999] shadow-2xl bg-[#080E1A] border-amber-500/50'
          : 'relative shadow-md'
      }`}
    >
      {/* Microsoft Word-Style Ribbon Toolbar */}
      <div className="bg-[#0F172A] border-b border-slate-800 p-2 sm:p-2.5 flex flex-wrap items-center gap-1 text-slate-300 select-none">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-slate-800">
          <button
            type="button"
            onClick={() => execCmd('undo')}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Undo size={15} />
          </button>
          <button
            type="button"
            onClick={() => execCmd('redo')}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Redo size={15} />
          </button>
        </div>

        {/* Heading / Style Selector */}
        <div className="pr-1.5 border-r border-slate-800">
          <select
            onChange={(e) => applyHeading(e.target.value)}
            defaultValue="p"
            className="py-1 px-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-white text-xs font-semibold focus:outline-none focus:border-[#FD9800]"
            title="Paragraph Styles"
          >
            <option value="p">Normal Text</option>
            <option value="h1">Heading 1 (Main Title)</option>
            <option value="h2">Heading 2 (Section Title)</option>
            <option value="h3">Heading 3 (Subsection)</option>
          </select>
        </div>

        {/* Font Formats: Bold, Italic, Underline, Strikethrough */}
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-slate-800">
          <button
            type="button"
            onClick={() => execCmd('bold')}
            title="Bold (Ctrl+B)"
            className={`p-1.5 rounded-lg font-bold transition-all ${
              activeStates.bold
                ? 'bg-[#FD9800] text-slate-950 font-black shadow-sm'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Bold size={15} />
          </button>

          <button
            type="button"
            onClick={() => execCmd('italic')}
            title="Italic (Ctrl+I)"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.italic
                ? 'bg-[#FD9800] text-slate-950 shadow-sm'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Italic size={15} />
          </button>

          <button
            type="button"
            onClick={() => execCmd('underline')}
            title="Underline (Ctrl+U)"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.underline
                ? 'bg-[#FD9800] text-slate-950 shadow-sm'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Underline size={15} />
          </button>

          <button
            type="button"
            onClick={() => execCmd('strikeThrough')}
            title="Strikethrough"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.strikeThrough
                ? 'bg-[#FD9800] text-slate-950 shadow-sm'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Strikethrough size={15} />
          </button>
        </div>

        {/* Text Color & Highlight */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-slate-800 relative">
          {/* Text Color Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTextColorPicker(!showTextColorPicker)
                setShowHighlightPicker(false)
              }}
              title="Font Color"
              className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Palette size={15} className="text-[#FD9800]" />
            </button>

            {showTextColorPicker && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 w-44 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block px-1 mb-1">
                  Font Color
                </span>
                {textColors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      execCmd('foreColor', c.value)
                      setShowTextColorPicker(false)
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs hover:bg-slate-800 text-left transition-colors"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-slate-200">{c.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Background Highlighter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowHighlightPicker(!showHighlightPicker)
                setShowTextColorPicker(false)
              }}
              title="Highlight Text Background"
              className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Highlighter size={15} className="text-amber-300" />
            </button>

            {showHighlightPicker && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 w-44 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block px-1 mb-1">
                  Highlight Color
                </span>
                {highlightColors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      execCmd('hiliteColor', c.value)
                      setShowHighlightPicker(false)
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs hover:bg-slate-800 text-left transition-colors"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded border border-white/20 shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-slate-200">{c.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-slate-800">
          <button
            type="button"
            onClick={() => execCmd('justifyLeft')}
            title="Align Left"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.justifyLeft
                ? 'bg-slate-800 text-[#FD9800]'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <AlignLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => execCmd('justifyCenter')}
            title="Align Center"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.justifyCenter
                ? 'bg-slate-800 text-[#FD9800]'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <AlignCenter size={15} />
          </button>
          <button
            type="button"
            onClick={() => execCmd('justifyRight')}
            title="Align Right"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.justifyRight
                ? 'bg-slate-800 text-[#FD9800]'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <AlignRight size={15} />
          </button>
          <button
            type="button"
            onClick={() => execCmd('justifyFull')}
            title="Justify"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.justifyFull
                ? 'bg-slate-800 text-[#FD9800]'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <AlignJustify size={15} />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-slate-800">
          <button
            type="button"
            onClick={() => execCmd('insertUnorderedList')}
            title="Bulleted List"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.insertUnorderedList
                ? 'bg-slate-800 text-[#FD9800]'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <List size={15} />
          </button>
          <button
            type="button"
            onClick={() => execCmd('insertOrderedList')}
            title="Numbered List"
            className={`p-1.5 rounded-lg transition-all ${
              activeStates.insertOrderedList
                ? 'bg-slate-800 text-[#FD9800]'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ListOrdered size={15} />
          </button>
        </div>

        {/* Inserts: Link, Scripture, Divider, Image */}
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-slate-800">
          <button
            type="button"
            onClick={openLinkModal}
            title="Insert Link (Ctrl+K)"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LinkIcon size={15} />
          </button>
          <button
            type="button"
            onClick={removeLink}
            title="Remove Link"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-rose-400 transition-colors"
          >
            <Unlink size={15} />
          </button>
          <button
            type="button"
            onClick={insertScriptureBox}
            title="Insert Scripture / Anointed Quote Box"
            className="p-1.5 rounded-lg hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Quote size={15} />
          </button>
          <button
            type="button"
            onClick={() => {
              saveSelection()
              setShowImageModal(true)
            }}
            title="Insert Image / Photograph"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-[#FD9800] transition-colors"
          >
            <ImageIcon size={15} />
          </button>
          <button
            type="button"
            onClick={insertDivider}
            title="Insert Horizontal Divider Line"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Minus size={15} />
          </button>
        </div>

        {/* Clear formatting, Preview & Fullscreen */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            type="button"
            onClick={() => execCmd('removeFormat')}
            title="Clear Formatting"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-rose-400 transition-colors text-slate-400"
          >
            <RemoveFormatting size={15} />
          </button>

          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            title={isPreview ? 'Back to Editing' : 'Preview Article Rendering'}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              isPreview
                ? 'bg-[#FD9800] text-slate-950 font-bold'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            {isPreview ? <Edit3 size={13} /> : <Eye size={13} />}
            <span className="hidden sm:inline">{isPreview ? 'Edit' : 'Preview'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Writing Canvas'}
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-slate-400"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Editor Content Canvas vs Preview Canvas */}
      <div className="flex-1 overflow-y-auto relative bg-[#080E1A]">
        {isPreview ? (
          /* Live Web Preview */
          <div className="p-6 sm:p-10 max-w-3xl mx-auto bg-white min-h-[400px] text-[#0F172A] article-rich-content shadow-inner rounded-b-xl my-4">
            <div className="mb-4 pb-2 border-b border-gray-200 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>Website Preview Mode</span>
              <span className="text-[#FD9800]">Matches Public Reader View</span>
            </div>
            <div
              className="leading-[1.85] text-[17px] space-y-4"
              dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400 italic">No content written yet.</p>' }}
            />
          </div>
        ) : (
          /* Microsoft Word Editing Canvas */
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onKeyUp={updateActiveStates}
            onMouseUp={updateActiveStates}
            onKeyDown={handleKeyDown}
            style={{ minHeight }}
            data-placeholder={placeholder}
            className="p-5 sm:p-7 text-slate-100 text-[15px] sm:text-base leading-relaxed focus:outline-none article-rich-content empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 empty:before:pointer-events-none"
          />
        )}
      </div>

      {/* Bottom Status Bar (Word Counter & Shortcut Help) */}
      <div className="bg-[#0B132B] border-t border-slate-800/80 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-300">
            Word Count: <strong className="text-[#FD9800]">{wordCount}</strong> words
          </span>
          <span>•</span>
          <span>
            {charCount} characters
          </span>
          <span>•</span>
          <span>
            Estimated Read: ~{Math.max(1, Math.ceil(wordCount / 180))} min
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500">
          <span>Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-[10px]">Ctrl+B</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-[10px]">Ctrl+I</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-[10px]">Ctrl+U</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-[10px]">Ctrl+K</kbd>
        </div>
      </div>

      {/* Modal 1: Insert Link */}
      {showLinkModal && (
        <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <LinkIcon size={16} className="text-[#FD9800]" />
                <span>Insert Hyperlink</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={applyLink} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Destination URL *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="https://example.com or /contact"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FD9800]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Link Text (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Text to display for this link"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FD9800]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FD9800] hover:bg-[#E98C00] text-slate-950 text-xs font-bold shadow-sm"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Insert Inline Image */}
      {showImageModal && (
        <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-2xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <ImageIcon size={16} className="text-[#FD9800]" />
                <span>Insert Article Photo</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={applyImage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Image Web URL
                </label>
                <input
                  type="text"
                  placeholder="https://... or upload below"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FD9800]"
                />
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Or Upload From Your Device:
                </span>
                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer border border-slate-700">
                  <Upload size={14} className={uploadingImage ? 'animate-bounce text-[#FD9800]' : ''} />
                  <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Choose Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDirectImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Altar ministration at the supernatural conference"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#FD9800]"
                />
              </div>

              {imageUrl && (
                <div className="h-32 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!imageUrl}
                  className="px-5 py-2 rounded-xl bg-[#FD9800] hover:bg-[#E98C00] text-slate-950 text-xs font-bold shadow-sm disabled:opacity-50"
                >
                  Insert Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

