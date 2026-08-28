import React, { useState, useRef, useCallback } from "react";
import {
  LayoutGrid, FileText, FolderOpen, BookImage, Files, Plus,
  Search, Bold, Italic, List, Quote, Link2, Image as ImageIcon,
  Heading2, Heading3, ChevronLeft, MoreVertical, Eye, Pencil,
  Trash2, X, Check, Clock, TramFront
} from "lucide-react";

/* ---------------------------------------------------------
   Calcutta Chronicle — Admin Panel (prototype)
   Design: masthead/press-desk aesthetic — ink navy sidebar,
   paper-cream workspace, rust-red primary action, tram-yellow
   for status accents. Serif display (Fraunces) for headings,
   Inter for UI, IBM Plex Mono for meta/bylines.

   Note on the editor: this uses a lightweight contentEditable
   implementation (document.execCommand) to demonstrate the
   Text → Image → Text inline flow you asked for. In your real
   project, swap this component's internals for TipTap — same
   toolbar, same "insert image at cursor" idea, but with a
   proper document schema instead of execCommand.
--------------------------------------------------------- */

const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const COLORS = {
  ink: "#1C232E",
  inkSoft: "#262F3D",
  paper: "#F6F1E7",
  card: "#FFFFFF",
  rust: "#B8472F",
  rustDark: "#9B3A26",
  tram: "#E7A93B",
  text: "#24211C",
  muted: "#847C6E",
  border: "#E3DACB",
  green: "#4B7A5C",
};

const MOCK_POSTS = [
  { id: 1, title: "Calcutta's Edifice: The Bones of a City", category: "Heritage", status: "published", date: "2026-07-28", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=200&q=60" },
  { id: 2, title: "Changing Face of the Maidan", category: "Cityscape", status: "published", date: "2026-07-22", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&q=60" },
  { id: 3, title: "Do You Know: The First Tram Line", category: "Culture", status: "draft", date: "2026-07-19", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&q=60" },
  { id: 4, title: "Spotlight: The Potters of Kumartuli", category: "Spotlight", status: "published", date: "2026-07-14", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60" },
  { id: 5, title: "Reminiscence: When Kolkata Was Calcutta", category: "Nostalgia", status: "draft", date: "2026-07-09", image: "https://images.unsplash.com/photo-1601758228041-3caa4de73d05?w=200&q=60" },
];

const MOCK_CATEGORIES = [
  { id: 1, name: "Heritage", description: "Landmarks and the buildings that outlived their builders.", banner: null, thumbnail: "https://images.unsplash.com/photo-1558431382-27e303142255?w=200&q=60" },
  { id: 2, name: "Cityscape", description: "The city as it looks right now, changing block by block.", banner: null, thumbnail: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&q=60" },
  { id: 3, name: "Culture", description: "Traditions, festivals and the people who keep them alive.", banner: null, thumbnail: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&q=60" },
  { id: 4, name: "Spotlight", description: "One subject, one deep look.", banner: null, thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60" },
  { id: 5, name: "Nostalgia", description: "When Kolkata was still Calcutta.", banner: null, thumbnail: "https://images.unsplash.com/photo-1601758228041-3caa4de73d05?w=200&q=60" },
];

const MOCK_MAGAZINES = [
  { id: 1, title: "July Issue 2026", cover: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?w=200&q=60", pdfName: "cc-july-2026.pdf", intro: "A grand old edifice, and Kolkata's tangled love of monsoon fest." },
  { id: 2, title: "June Issue 2026", cover: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=200&q=60", pdfName: "cc-june-2026.pdf", intro: "Thousand and one monsoon floating tales." },
  { id: 3, title: "May Issue 2026", cover: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=200&q=60", pdfName: "cc-may-2026.pdf", intro: "Roots of Ingres in Satyajit." },
];

const MOCK_PAGES = [
  { id: 1, title: "About Us", content: "<h2>About Calcutta Chronicle</h2><p>A digital publication devoted to the city's stories.</p>" },
  { id: 2, title: "Membership", content: "<p>Details on membership tiers go here.</p>" },
  { id: 3, title: "Contact Us", content: "<p>Reach the editorial desk.</p>" },
];

function NavItem({ icon: Icon, label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        width: "100%", padding: "10px 16px", border: "none",
        background: active ? COLORS.inkSoft : "transparent",
        borderLeft: active ? `3px solid ${COLORS.tram}` : "3px solid transparent",
        color: active ? "#F6F1E7" : "#9FA6B2",
        fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500,
        cursor: "pointer", textAlign: "left", transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#20283480"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      <Icon size={17} strokeWidth={1.8} />
      <span style={{ flex: 1 }}>{label}</span>
      {count != null && (
        <span style={{
          fontFamily: "IBM Plex Mono, monospace", fontSize: 11,
          color: active ? COLORS.tram : "#6B7280",
        }}>{count}</span>
      )}
    </button>
  );
}

function StatusPill({ status }) {
  const isPub = status === "published";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 9px", borderRadius: 20,
      fontFamily: "IBM Plex Mono, monospace", fontSize: 11, fontWeight: 500,
      background: isPub ? "#E9F1EC" : "#F3EEE3",
      color: isPub ? COLORS.green : "#8A7E5C",
      border: `1px solid ${isPub ? "#C9DED0" : "#E1D7BB"}`,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: isPub ? COLORS.green : "#B7A968",
      }} />
      {isPub ? "Published" : "Draft"}
    </span>
  );
}

function ToolbarButton({ icon: Icon, onClick, title, active }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 32, height: 32, border: "none", borderRadius: 6,
        background: active ? "#EFE3DA" : "transparent",
        color: active ? COLORS.rustDark : "#4A463D",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#EFE9DB"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = active ? "#EFE3DA" : "transparent"; }}
    >
      <Icon size={16} strokeWidth={1.9} />
    </button>
  );
}

function ClassicEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const exec = useCallback((cmd, val = null) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  const handleInsertImage = () => fileInputRef.current?.click();

  const onFileChosen = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      editorRef.current?.focus();
      document.execCommand(
        "insertHTML",
        false,
        `<img src="${reader.result}" style="max-width:100%;border-radius:8px;margin:14px 0;display:block;" />`
      );
      onChange(editorRef.current?.innerHTML || "");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleLink = () => {
    const url = window.prompt("Link URL");
    if (url) exec("createLink", url);
  };

  return (
    <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card, overflow: "hidden" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 2, padding: "8px 10px",
        borderBottom: `1px solid ${COLORS.border}`, background: "#FBF8F2", flexWrap: "wrap",
      }}>
        <ToolbarButton icon={Bold} title="Bold" onClick={() => exec("bold")} />
        <ToolbarButton icon={Italic} title="Italic" onClick={() => exec("italic")} />
        <div style={{ width: 1, height: 20, background: COLORS.border, margin: "0 4px" }} />
        <ToolbarButton icon={Heading2} title="Heading" onClick={() => exec("formatBlock", "H2")} />
        <ToolbarButton icon={Heading3} title="Subheading" onClick={() => exec("formatBlock", "H3")} />
        <div style={{ width: 1, height: 20, background: COLORS.border, margin: "0 4px" }} />
        <ToolbarButton icon={List} title="Bullet list" onClick={() => exec("insertUnorderedList")} />
        <ToolbarButton icon={Quote} title="Quote" onClick={() => exec("formatBlock", "BLOCKQUOTE")} />
        <ToolbarButton icon={Link2} title="Link" onClick={handleLink} />
        <div style={{ width: 1, height: 20, background: COLORS.border, margin: "0 4px" }} />
        <ToolbarButton icon={ImageIcon} title="Insert image inline" onClick={handleInsertImage} />
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChosen} style={{ display: "none" }} />
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        data-placeholder="Start writing — drop in an image whenever the story calls for one…"
        style={{
          minHeight: 340, padding: "22px 26px", outline: "none",
          fontFamily: "'Fraunces', serif", fontSize: 17, lineHeight: 1.75,
          color: COLORS.text,
        }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #B3AA98;
          font-family: 'Fraunces', serif;
          font-style: italic;
        }
        [contenteditable] h2 { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; margin: 20px 0 8px; }
        [contenteditable] h3 { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; margin: 16px 0 6px; }
        [contenteditable] blockquote { border-left: 3px solid ${COLORS.rust}; margin: 16px 0; padding: 4px 0 4px 16px; color: ${COLORS.muted}; font-style: italic; }
        [contenteditable] a { color: ${COLORS.rustDark}; }
        [contenteditable] ul { padding-left: 22px; }
      `}</style>
    </div>
  );
}

function AddPostView({ onBack, onPublish, categories }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]?.name || "");
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState(null);
  const featuredInputRef = useRef(null);

  const onFeaturedChosen = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFeatured(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: COLORS.muted, fontFamily: "Inter, sans-serif", fontSize: 13, cursor: "pointer",
          marginBottom: 18, padding: 0,
        }}
      >
        <ChevronLeft size={15} /> Back to Posts
      </button>

      <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title"
            style={{
              width: "100%", border: "none", outline: "none", background: "transparent",
              fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 600,
              color: COLORS.text, marginBottom: 18, padding: "4px 0",
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          />
          <ClassicEditor value={content} onChange={setContent} />
        </div>

        <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Publish box */}
          <div style={{
            border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card, overflow: "hidden",
          }}>
            <div style={{
              padding: "10px 16px", background: "#FBF8F2", borderBottom: `1px solid ${COLORS.border}`,
              fontFamily: "IBM Plex Mono, monospace", fontSize: 11, letterSpacing: "0.06em",
              color: COLORS.muted, textTransform: "uppercase",
            }}>
              Publish
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "Inter, sans-serif", color: COLORS.text }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.muted }}><Clock size={13} /> Status</span>
                <span>Draft</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <button style={{
                  flex: 1, padding: "9px 0", borderRadius: 7, border: `1px solid ${COLORS.border}`,
                  background: COLORS.card, color: COLORS.text, fontFamily: "Inter, sans-serif",
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>
                  Save Draft
                </button>
                <button
                  onClick={() => onPublish({ title, category, content, featured })}
                  style={{
                    flex: 1, padding: "9px 0", borderRadius: 7, border: "none",
                    background: COLORS.rust, color: "#fff", fontFamily: "Inter, sans-serif",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>

          {/* Category box */}
          <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card, overflow: "hidden" }}>
            <div style={{
              padding: "10px 16px", background: "#FBF8F2", borderBottom: `1px solid ${COLORS.border}`,
              fontFamily: "IBM Plex Mono, monospace", fontSize: 11, letterSpacing: "0.06em",
              color: COLORS.muted, textTransform: "uppercase",
            }}>
              Category
            </div>
            <div style={{ padding: 16 }}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%", padding: "8px 10px", borderRadius: 7,
                  border: `1px solid ${COLORS.border}`, fontFamily: "Inter, sans-serif",
                  fontSize: 13, color: COLORS.text, background: COLORS.card,
                }}
              >
                {categories.map((c) => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Featured image box */}
          <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card, overflow: "hidden" }}>
            <div style={{
              padding: "10px 16px", background: "#FBF8F2", borderBottom: `1px solid ${COLORS.border}`,
              fontFamily: "IBM Plex Mono, monospace", fontSize: 11, letterSpacing: "0.06em",
              color: COLORS.muted, textTransform: "uppercase",
            }}>
              Featured Image
            </div>
            <div style={{ padding: 16 }}>
              {featured ? (
                <div style={{ position: "relative" }}>
                  <img src={featured} alt="" style={{ width: "100%", borderRadius: 7, display: "block" }} />
                  <button
                    onClick={() => setFeatured(null)}
                    style={{
                      position: "absolute", top: 6, right: 6, width: 24, height: 24, borderRadius: "50%",
                      border: "none", background: "rgba(28,35,46,0.75)", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => featuredInputRef.current?.click()}
                  style={{
                    width: "100%", padding: "24px 0", borderRadius: 7, border: `1.5px dashed ${COLORS.border}`,
                    background: "#FBF8F2", color: COLORS.muted, fontFamily: "Inter, sans-serif",
                    fontSize: 13, cursor: "pointer", display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 6,
                  }}
                >
                  <ImageIcon size={20} strokeWidth={1.6} />
                  Set featured image
                </button>
              )}
              <input ref={featuredInputRef} type="file" accept="image/*" onChange={onFeaturedChosen} style={{ display: "none" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <div style={{
      fontFamily: "IBM Plex Mono, monospace", fontSize: 11, letterSpacing: "0.06em",
      color: COLORS.muted, textTransform: "uppercase", marginBottom: 6,
    }}>{children}</div>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%", padding: "9px 12px", borderRadius: 7,
        border: `1px solid ${COLORS.border}`, fontFamily: "Inter, sans-serif",
        fontSize: 13.5, color: COLORS.text, background: COLORS.card, boxSizing: "border-box",
        ...(props.style || {}),
      }}
    />
  );
}

function ImagePicker({ image, onPick, onClear, label, height = 140 }) {
  const ref = useRef(null);
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPick(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  return (
    <div>
      {image ? (
        <div style={{ position: "relative" }}>
          <img src={image} alt="" style={{ width: "100%", height, objectFit: "cover", borderRadius: 7, display: "block" }} />
          <button
            onClick={onClear}
            style={{
              position: "absolute", top: 6, right: 6, width: 24, height: 24, borderRadius: "50%",
              border: "none", background: "rgba(28,35,46,0.75)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          ><X size={13} /></button>
        </div>
      ) : (
        <button
          onClick={() => ref.current?.click()}
          style={{
            width: "100%", height, borderRadius: 7, border: `1.5px dashed ${COLORS.border}`,
            background: "#FBF8F2", color: COLORS.muted, fontFamily: "Inter, sans-serif",
            fontSize: 13, cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <ImageIcon size={20} strokeWidth={1.6} />
          {label}
        </button>
      )}
      <input ref={ref} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
    </div>
  );
}

function FormShell({ title, onBack, onSave, saveLabel = "Save", children }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: COLORS.muted, fontFamily: "Inter, sans-serif", fontSize: 13, cursor: "pointer",
          marginBottom: 18, padding: 0,
        }}
      >
        <ChevronLeft size={15} /> Back
      </button>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, margin: "0 0 20px", color: COLORS.text }}>{title}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>{children}</div>
      <button
        onClick={onSave}
        style={{
          marginTop: 24, padding: "10px 22px", borderRadius: 8, border: "none",
          background: COLORS.rust, color: "#fff", fontFamily: "Inter, sans-serif",
          fontSize: 13.5, fontWeight: 600, cursor: "pointer",
        }}
      >
        {saveLabel}
      </button>
    </div>
  );
}

function CategoryFormView({ onBack, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [banner, setBanner] = useState(null);
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <FormShell
      title="Add New Category"
      onBack={onBack}
      saveLabel="Create Category"
      onSave={() => name.trim() && onSave({ name, description, thumbnail, banner })}
    >
      <div>
        <FieldLabel>Name</FieldLabel>
        <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Roadscape" />
        {name && <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: COLORS.muted, marginTop: 5 }}>/tales/{slug || "…"}</div>}
      </div>
      <div>
        <FieldLabel>Description</FieldLabel>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="One line for the Tales grid and archive header"
          style={{
            width: "100%", padding: "9px 12px", borderRadius: 7, border: `1px solid ${COLORS.border}`,
            fontFamily: "Inter, sans-serif", fontSize: 13.5, color: COLORS.text, resize: "vertical", boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <FieldLabel>Thumbnail (Tales grid tile)</FieldLabel>
          <ImagePicker image={thumbnail} onPick={setThumbnail} onClear={() => setThumbnail(null)} label="Set thumbnail" />
        </div>
        <div>
          <FieldLabel>Banner (archive page hero)</FieldLabel>
          <ImagePicker image={banner} onPick={setBanner} onClear={() => setBanner(null)} label="Set banner" />
        </div>
      </div>
    </FormShell>
  );
}

function MagazineFormView({ onBack, onSave }) {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);
  const [intro, setIntro] = useState("");
  const [pdfName, setPdfName] = useState(null);
  const pdfRef = useRef(null);

  const onPdfChosen = (e) => {
    const file = e.target.files?.[0];
    if (file) setPdfName(file.name);
  };

  return (
    <FormShell
      title="Add New Magazine Issue"
      onBack={onBack}
      saveLabel="Create Issue"
      onSave={() => title.trim() && onSave({ title, cover, intro, pdfName })}
    >
      <div>
        <FieldLabel>Issue Title</FieldLabel>
        <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. August Issue 2026" />
      </div>
      <div>
        <FieldLabel>Cover Image</FieldLabel>
        <ImagePicker image={cover} onPick={setCover} onClear={() => setCover(null)} label="Upload cover image" height={200} />
      </div>
      <div>
        <FieldLabel>PDF File</FieldLabel>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
          border: `1.5px dashed ${COLORS.border}`, borderRadius: 7, background: "#FBF8F2",
        }}>
          <button
            onClick={() => pdfRef.current?.click()}
            style={{
              padding: "7px 14px", borderRadius: 6, border: `1px solid ${COLORS.border}`,
              background: COLORS.card, color: COLORS.text, fontFamily: "Inter, sans-serif",
              fontSize: 12.5, cursor: "pointer",
            }}
          >
            Choose PDF
          </button>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12, color: pdfName ? COLORS.text : COLORS.muted }}>
            {pdfName || "No file selected"}
          </span>
          <input ref={pdfRef} type="file" accept="application/pdf" onChange={onPdfChosen} style={{ display: "none" }} />
        </div>
      </div>
      <div>
        <FieldLabel>Intro Text</FieldLabel>
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={3}
          placeholder="Short blurb shown on the Magazines cards"
          style={{
            width: "100%", padding: "9px 12px", borderRadius: 7, border: `1px solid ${COLORS.border}`,
            fontFamily: "Inter, sans-serif", fontSize: 13.5, color: COLORS.text, resize: "vertical", boxSizing: "border-box",
          }}
        />
      </div>
    </FormShell>
  );
}

function PageEditView({ page, onBack, onSave }) {
  const [content, setContent] = useState(page.content);
  return (
    <div style={{ maxWidth: 760 }}>
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: COLORS.muted, fontFamily: "Inter, sans-serif", fontSize: 13, cursor: "pointer",
          marginBottom: 18, padding: 0,
        }}
      >
        <ChevronLeft size={15} /> Back to Pages
      </button>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: "0 0 18px", color: COLORS.text }}>{page.title}</h1>
      <ClassicEditor value={content} onChange={setContent} />
      <button
        onClick={() => onSave(content)}
        style={{
          marginTop: 20, padding: "10px 22px", borderRadius: 8, border: "none",
          background: COLORS.rust, color: "#fff", fontFamily: "Inter, sans-serif",
          fontSize: 13.5, fontWeight: 600, cursor: "pointer",
        }}
      >
        Save Page
      </button>
    </div>
  );
}

function PostsView({ posts, onNew }) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: 0, color: COLORS.text }}>Posts</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: COLORS.muted, margin: "4px 0 0" }}>Tales, Spotlight and every other story on the site.</p>
        </div>
        <button
          onClick={onNew}
          style={{
            display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 8,
            border: "none", background: COLORS.rust, color: "#fff", fontFamily: "Inter, sans-serif",
            fontSize: 13.5, fontWeight: 600, cursor: "pointer",
          }}
        >
          <Plus size={15} /> Add New Post
        </button>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 8,
        border: `1px solid ${COLORS.border}`, background: COLORS.card, marginBottom: 16, maxWidth: 320,
      }}>
        <Search size={14} color={COLORS.muted} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          style={{ border: "none", outline: "none", fontFamily: "Inter, sans-serif", fontSize: 13.5, flex: 1, background: "transparent", color: COLORS.text }}
        />
      </div>

      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card, overflow: "hidden" }}>
        {filtered.map((p, i) => (
          <div
            key={p.id}
            style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
              borderBottom: i < filtered.length - 1 ? `1px solid ${COLORS.border}` : "none",
            }}
          >
            <img src={p.image} alt="" style={{ width: 46, height: 46, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15.5, fontWeight: 600, color: COLORS.text }}>{p.title}</div>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: COLORS.muted, marginTop: 3 }}>
                {p.category} · {p.date}
              </div>
            </div>
            <StatusPill status={p.status} />
            <div style={{ display: "flex", gap: 4 }}>
              <button style={{ width: 30, height: 30, border: "none", background: "transparent", borderRadius: 6, color: COLORS.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Pencil size={14} /></button>
              <button style={{ width: 30, height: 30, border: "none", background: "transparent", borderRadius: 6, color: COLORS.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Eye size={14} /></button>
              <button style={{ width: 30, height: 30, border: "none", background: "transparent", borderRadius: 6, color: "#B85A4E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ posts, categories, magazines }) {
  const published = posts.filter(p => p.status === "published").length;
  const drafts = posts.filter(p => p.status === "draft").length;
  const stats = [
    { label: "Published Posts", value: published },
    { label: "Drafts", value: drafts },
    { label: "Categories", value: categories.length },
    { label: "Magazine Issues", value: magazines.length },
  ];
  return (
    <div>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, margin: 0, color: COLORS.text }}>
        Good afternoon, Editor.
      </h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: COLORS.muted, margin: "6px 0 26px" }}>
        Here's where the Chronicle stands today.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 30 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card,
            padding: "18px 18px 16px", borderTop: `3px solid ${COLORS.tram}`,
          }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: COLORS.text }}>{s.value}</div>
            <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: COLORS.muted, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
        Recently Updated
      </div>
      <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card, overflow: "hidden" }}>
        {posts.slice(0, 4).map((p, i) => (
          <div key={p.id} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "11px 16px",
            borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none",
          }}>
            <img src={p.image} alt="" style={{ width: 36, height: 36, borderRadius: 5, objectFit: "cover" }} />
            <div style={{ flex: 1, fontFamily: "Inter, sans-serif", fontSize: 13.5, color: COLORS.text }}>{p.title}</div>
            <StatusPill status={p.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CalcuttaAdmin() {
  const [view, setView] = useState("dashboard");
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [magazines, setMagazines] = useState(MOCK_MAGAZINES);
  const [pages, setPages] = useState(MOCK_PAGES);
  const [activePage, setActivePage] = useState(null);
  const [toast, setToast] = useState(null);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const navMain = [
    { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { key: "posts", label: "Posts", icon: FileText, count: posts.length },
    { key: "categories", label: "Categories", icon: FolderOpen, count: categories.length },
    { key: "magazines", label: "Magazines", icon: BookImage, count: magazines.length },
    { key: "pages", label: "Pages", icon: Files, count: pages.length },
  ];

  const handlePublish = ({ title, category, content, featured }) => {
    if (!title.trim()) { flash("Add a title before publishing."); return; }
    const newPost = {
      id: Date.now(), title, category, status: "published",
      date: new Date().toISOString().slice(0, 10),
      image: featured || "https://images.unsplash.com/photo-1558431382-27e303142255?w=200&q=60",
    };
    setPosts([newPost, ...posts]);
    setView("posts");
    flash("Post published.");
  };

  const handleSaveCategory = ({ name, description, thumbnail, banner }) => {
    setCategories([{ id: Date.now(), name, description, thumbnail, banner }, ...categories]);
    setView("categories");
    flash("Category created.");
  };

  const handleSaveMagazine = ({ title, cover, intro, pdfName }) => {
    setMagazines([{ id: Date.now(), title, cover, intro, pdfName }, ...magazines]);
    setView("magazines");
    flash("Magazine issue created.");
  };

  const handleSavePage = (content) => {
    setPages(pages.map(p => p.id === activePage.id ? { ...p, content } : p));
    setView("pages");
    flash("Page saved.");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.paper, fontFamily: "Inter, sans-serif" }}>
      <style>{FONT_IMPORTS}</style>

      {/* Sidebar */}
      <div style={{ width: 220, background: COLORS.ink, flexShrink: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "22px 18px 16px", borderBottom: "1px solid #2C3543" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <TramFront size={18} color={COLORS.tram} strokeWidth={2} />
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: "#F6F1E7" }}>
              Calcutta Chronicle
            </span>
          </div>
          <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: "#6B7280", marginTop: 4, letterSpacing: "0.06em" }}>
            EDITORIAL DESK
          </div>
        </div>
        <div style={{ padding: "14px 0", flex: 1 }}>
          {navMain.map(item => (
            <NavItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              count={item.count}
              active={
                view === item.key ||
                (item.key === "posts" && view === "add-post") ||
                (item.key === "categories" && view === "add-category") ||
                (item.key === "magazines" && view === "add-magazine") ||
                (item.key === "pages" && view === "edit-page")
              }
              onClick={() => setView(item.key)}
            />
          ))}
        </div>
        <div style={{ padding: 16, borderTop: "1px solid #2C3543", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: COLORS.rust,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Fraunces', serif", fontSize: 13, color: "#fff", fontWeight: 600,
          }}>E</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#D6D9DE" }}>Editor</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "30px 40px", minWidth: 0 }}>
        {view === "dashboard" && <Dashboard posts={posts} categories={categories} magazines={magazines} />}
        {view === "posts" && <PostsView posts={posts} onNew={() => setView("add-post")} />}
        {view === "add-post" && <AddPostView onBack={() => setView("posts")} onPublish={handlePublish} categories={categories} />}

        {view === "categories" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: 0, color: COLORS.text }}>Categories</h1>
              <button
                onClick={() => setView("add-category")}
                style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 8,
                  border: "none", background: COLORS.rust, color: "#fff", fontFamily: "Inter, sans-serif",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}
              ><Plus size={14} /> Add New Category</button>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: COLORS.muted, margin: "4px 0 20px" }}>
              These populate the Tales hub grid — each links out to its own archive of posts.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
              {categories.map((c) => (
                <div key={c.id} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card, overflow: "hidden" }}>
                  {c.thumbnail && <img src={c.thumbnail} alt="" style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }} />}
                  <div style={{ padding: "12px 14px", borderTop: c.thumbnail ? "none" : `3px solid ${COLORS.tram}` }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15.5, fontWeight: 600, color: COLORS.text }}>{c.name}</div>
                    <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: COLORS.muted, marginTop: 4 }}>
                      {posts.filter(p => p.category === c.name).length} posts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {view === "add-category" && <CategoryFormView onBack={() => setView("categories")} onSave={handleSaveCategory} />}

        {view === "magazines" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: 0, color: COLORS.text }}>Magazines</h1>
              <button
                onClick={() => setView("add-magazine")}
                style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 8,
                  border: "none", background: COLORS.rust, color: "#fff", fontFamily: "Inter, sans-serif",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}
              ><Plus size={14} /> Add New Issue</button>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: COLORS.muted, margin: "4px 0 20px" }}>
              Cover, PDF attachment and intro text for each issue.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
              {magazines.map((m) => (
                <div key={m.id} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card, overflow: "hidden" }}>
                  <img src={m.cover} alt="" style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.text }}>{m.title}</div>
                    {m.pdfName && (
                      <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10.5, color: COLORS.muted, marginTop: 4 }}>{m.pdfName}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {view === "add-magazine" && <MagazineFormView onBack={() => setView("magazines")} onSave={handleSaveMagazine} />}

        {view === "pages" && (
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: 0, color: COLORS.text }}>Pages</h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: COLORS.muted, margin: "4px 0 20px" }}>
              Static pages — same editor as Posts, so content can mix text and images too.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setActivePage(p); setView("edit-page"); }}
                  style={{
                    textAlign: "left", border: `1px solid ${COLORS.border}`, borderRadius: 10, background: COLORS.card,
                    padding: 16, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: COLORS.text }}>{p.title}</div>
                  <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: COLORS.muted, marginTop: 4 }}>Click to edit</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {view === "edit-page" && activePage && (
          <PageEditView page={activePage} onBack={() => setView("pages")} onSave={handleSavePage} />
        )}
      </div>

      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: COLORS.ink, color: "#F6F1E7", padding: "11px 20px", borderRadius: 8,
          fontFamily: "Inter, sans-serif", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}>
          <Check size={14} color={COLORS.tram} /> {toast}
        </div>
      )}
    </div>
  );
}
