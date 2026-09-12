import {
  AlertCircle,
  Check,
  ChevronLeft, ChevronRight,
  File,
  FileText,
  Folder,
  Inbox,
  Menu,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Send,
  Star,
  Tag,
  Trash2,
  X
} from 'lucide-react';
import { useMemo, useState } from 'react';
import Container from "../components/shared/container";
import Section from "../components/shared/section";
// --- Types ---
type FolderType = 'inbox' | 'starred' | 'draft' | 'sent' | 'trash' | 'important' | 'spam';
type LabelType = 'Social' | 'Promotions' | 'Updates' | 'Forums';

interface Email {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  hasAttachment?: boolean;
  attachments?: string[];
  folder: FolderType;
  labels?: LabelType[];
  category?: 'Primary' | 'Social' | 'Promotions' | 'Updates' | 'Forums'; // Tab category for Inbox
}

// --- Mock Data ---
const INITIAL_EMAILS: Email[] = [
  { id: '1', sender: 'Dallas C. Payne', subject: 'Social Media Update', snippet: 'Lucas Kriebel (@Daniel J. Olsen) has sent you a direct message on Twitter!', date: 'Today', isRead: false, isStarred: false, isImportant: true, folder: 'inbox', category: 'Social', labels: ['Social'] },
  { id: '2', sender: 'Florence A. Lopez', subject: 'Images', snippet: 'Images attached for the project review.', date: '2/21/2001', isRead: false, isStarred: true, isImportant: true, hasAttachment: true, folder: 'inbox', category: 'Primary' },
  { id: '3', sender: 'Gail A. Nix', subject: 'Train/Bus', snippet: 'Yes ok, great! I\'m not stuck in Stockholm anymore.', date: '2/19/2001', isRead: true, isStarred: false, isImportant: false, folder: 'inbox', category: 'Primary' },
  { id: '4', sender: 'Lynne J. Petty', subject: 'Top Stories', snippet: 'Our top pick for you on Medium this week.', date: '2/28/2001', isRead: true, isStarred: false, isImportant: false, folder: 'inbox', category: 'Updates', labels: ['Updates'] },
  { id: '5', sender: 'Victoria P. Miller', subject: 'Dashboard Report', snippet: 'Please review the attached dashboard PDF.', attachments: ['Dashboard.pdf'], date: '2/28/2001', isRead: true, isStarred: true, isImportant: false, folder: 'inbox', category: 'Primary' },
  { id: '6', sender: 'Dallas C. Payne', subject: 'Documents Required', snippet: 'Please sign these docs.', attachments: ['doc1.doc', 'doc2.doc'], date: '2/27/2001', isRead: true, isStarred: false, isImportant: true, folder: 'inbox', category: 'Primary' },
  { id: '7', sender: 'Florence A. Lopez', subject: 'Regarding meeting', snippet: 'That\'s great, see you on Thursday!', date: '2/24/2001', isRead: true, isStarred: true, isImportant: false, folder: 'sent', category: 'Primary' },
  { id: '8', sender: 'System Admin', subject: 'Password Reset', snippet: 'Click here to reset your password.', date: '2/24/2001', isRead: true, isStarred: false, isImportant: true, folder: 'spam', category: 'Updates' },
  { id: '9', sender: 'Lynne J. Petty', subject: 'Fishing Trip?', snippet: 'Hey, You wanna join me and Fred?', date: '2/23/2001', isRead: true, isStarred: false, isImportant: true, folder: 'inbox', category: 'Social' },
  { id: '10', sender: 'Tonya J. Hill', subject: 'Re: Hey man', snippet: 'Nah man sorry i don\'t. Should i get it?', date: '2/23/2001', isRead: true, isStarred: true, isImportant: true, folder: 'trash', category: 'Primary' },
  { id: '11', sender: 'Stack Exchange', subject: '1 new item', snippet: 'New comments on your post.', date: '2/21/2001', isRead: true, isStarred: true, isImportant: false, folder: 'inbox', category: 'Forums', labels: ['Forums'] },
  { id: '12', sender: 'Google Drive', subject: 'Storage Alert', snippet: 'You are running low on storage space.', date: '2/20/2001', isRead: true, isStarred: true, isImportant: false, folder: 'inbox', category: 'Promotions', labels: ['Promotions'] },
];

// --- Sub-Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  count, 
  active, 
  onClick 
}: { 
  icon: any, label: string, count?: number, active?: boolean, onClick: () => void 
}) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center justify-between px-4 py-2.5 mb-1 rounded-r-full cursor-pointer transition-all duration-200
      ${active 
        ? 'bg-rose-500/10 text-rose-500 border-l-4 border-rose-500' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border-l-4 border-transparent'}
    `}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-rose-500' : 'text-slate-500'} />
      <span className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
    </div>
    {count !== undefined && count > 0 && (
      <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
        {count}
      </span>
    )}
  </div>
);

const LabelItem = ({ color, label, onClick }: { color: string, label: string, onClick: () => void }) => (
  <div onClick={onClick} className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 cursor-pointer rounded-r-full transition-colors">
    <div className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const EmailRow = ({ 
  email, 
  selected, 
  onToggleSelect, 
  onToggleStar, 
  onToggleImportant 
}: { 
  email: Email, 
  selected: boolean, 
  onToggleSelect: () => void, 
  onToggleStar: () => void,
  onToggleImportant: () => void
}) => {
  return (
    <div className={`
      group flex items-center gap-4 px-4 py-3 border-b border-slate-800 cursor-pointer transition-colors
      ${selected ? 'bg-blue-900/20' : 'hover:bg-slate-800/30'}
      ${!email.isRead ? 'bg-slate-800/10' : ''}
    `}>
      {/* Controls */}
      <div className="flex items-center gap-3 min-w-[80px]">
        <div 
          onClick={(e) => { e.stopPropagation(); onToggleSelect(); }}
          className={`w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer transition-colors ${selected ? 'bg-rose-500 border-rose-500' : 'border-slate-600 hover:border-slate-400'}`}
        >
           {selected && <Check size={14} className="text-white" />}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleStar(); }}
          className="text-slate-500 hover:text-yellow-500 focus:outline-none transition-transform active:scale-90"
        >
          <Star size={18} fill={email.isStarred ? "#eab308" : "none"} className={email.isStarred ? "text-yellow-500" : ""} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleImportant(); }}
          className="text-slate-500 hover:text-orange-500 focus:outline-none transition-transform active:scale-90"
        >
          <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] transform rotate-90 ${email.isImportant ? 'border-b-orange-500' : 'border-b-slate-600'}`} />
        </button>
      </div>

      {/* Sender */}
      <div className={`w-48 text-sm truncate ${!email.isRead ? 'font-bold text-white' : 'text-slate-300'}`}>
        {email.sender}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <div className="flex-1 truncate text-sm">
          {email.labels && email.labels.map(l => (
             <span key={l} className="mr-2 px-1.5 py-0.5 text-[10px] uppercase font-bold rounded bg-slate-700 text-slate-300">{l}</span>
          ))}
          <span className={`${!email.isRead ? 'font-bold text-slate-200' : 'text-slate-300'}`}>
            {email.subject}
          </span>
          <span className="text-slate-500 mx-2">—</span>
          <span className="text-slate-500">
            {email.snippet || '(No Preview)'}
          </span>
        </div>
        
        {/* Attachments */}
        {email.attachments && (
          <div className="flex gap-2">
            {email.attachments.map((file, idx) => (
              <span key={idx} className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs text-blue-400">
                <FileText size={10} />
                {file}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Date */}
      <div className={`text-xs text-slate-500 w-24 text-right ${!email.isRead ? 'font-semibold text-slate-400' : ''}`}>
        {email.date}
      </div>
    </div>
  );
};

const ToolbarButton = ({ icon: Icon, label, onClick }: { icon: any, label?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors active:bg-slate-700" 
    title={label}
  >
    <Icon size={18} />
  </button>
);

const ToolbarDropdown = ({ icon: Icon, label }: { icon: any, label?: string }) => (
  <button className="flex items-center gap-1 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors text-sm font-medium">
    <Icon size={16} />
    {label && <span>{label}</span>}
    <span className="text-[10px] ml-1">▼</span>
  </button>
);

const ComposeModal = ({ isOpen, onClose, onSend }: { isOpen: boolean, onClose: () => void, onSend: (to: string, subject: string) => void }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
          <h3 className="font-semibold text-white">New Message</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <input 
            type="email" 
            placeholder="To" 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Subject" 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <textarea 
            placeholder="Message..." 
            className="w-full h-64 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 resize-none focus:outline-none focus:border-rose-500"
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>
        <div className="p-4 border-t border-slate-700 flex justify-end gap-2 bg-slate-800/30">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white font-medium">Discard</button>
          <button 
            onClick={() => {
              if(!to) return alert("Please add a recipient");
              onSend(to, subject);
              setTo(''); setSubject(''); setBody('');
            }}
            className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium shadow-lg shadow-rose-900/20"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function Emails() {
  const [emails, setEmails] = useState<Email[]>(INITIAL_EMAILS);
  const [currentFolder, setCurrentFolder] = useState<FolderType>('inbox');
  const [activeTab, setActiveTab] = useState('Primary'); // For Inbox tabs
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [composeOpen, setComposeOpen] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20; // In a real app this would matter more, mock data is small

  // --- Filtering Logic ---
  const filteredEmails = useMemo(() => {
    let result = emails.filter(email => email.folder === currentFolder);

    // If in Inbox, apply Tab filtering
    if (currentFolder === 'inbox') {
      result = result.filter(email => email.category === activeTab);
    }

    return result;
  }, [emails, currentFolder, activeTab]);

  // --- Pagination Slice ---
  const displayedEmails = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredEmails.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmails, page]);

  // --- Handlers ---
  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === displayedEmails.length && displayedEmails.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(displayedEmails.map(e => e.id)));
    }
  };

  const handleToggleStar = (id: string) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, isStarred: !e.isStarred } : e));
  };

  const handleToggleImportant = (id: string) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, isImportant: !e.isImportant } : e));
  };

  const handleMoveToTrash = () => {
    const idsToMove = Array.from(selectedIds);
    if (idsToMove.length === 0) return;

    setEmails(prev => prev.map(e => 
      idsToMove.includes(e.id) ? { ...e, folder: 'trash' } : e
    ));
    setSelectedIds(new Set());
    
    // If we are currently in trash, verify if we want permanent delete functionality or not. 
    // For now, moving to trash from trash does nothing or we could implement permanent delete.
    if (currentFolder === 'trash') {
        // Permanent delete logic
        setEmails(prev => prev.filter(e => !idsToMove.includes(e.id)));
    }
  };

  const handleMarkSpam = () => {
    const idsToMove = Array.from(selectedIds);
    setEmails(prev => prev.map(e => 
      idsToMove.includes(e.id) ? { ...e, folder: 'spam' } : e
    ));
    setSelectedIds(new Set());
  };

  const handleSendEmail = (to: string, subject: string) => {
    const newEmail: Email = {
      id: Date.now().toString(),
      sender: 'Me',
      subject: subject || '(No Subject)',
      snippet: `Sent to ${to}`,
      date: 'Just now',
      isRead: true,
      isStarred: false,
      isImportant: false,
      folder: 'sent',
      category: 'Primary'
    };
    setEmails(prev => [newEmail, ...prev]);
    setComposeOpen(false);
    setCurrentFolder('sent'); // Switch view to confirm
  };

  const getCount = (folder: FolderType) => emails.filter(e => e.folder === folder && !e.isRead).length;

  return (
    <Container title="Email App" description="A complete, responsive email dashboard interface built with Tailwind CSS.">
      <Section title="Inbox Interface">
        <div className="flex h-[800px] bg-slate-900">
          
          {/* --- Sidebar --- */}
          <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950/30 flex flex-col">
            <div className="p-6">
              <button 
                onClick={() => setComposeOpen(true)}
                className="w-full py-3 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded shadow-lg shadow-rose-900/20 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Compose
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto pr-4">
              <div className="mb-8">
                <SidebarItem 
                  icon={Inbox} 
                  label="Inbox" 
                  count={getCount('inbox')} 
                  active={currentFolder === 'inbox'} 
                  onClick={() => setCurrentFolder('inbox')}
                />
                <SidebarItem 
                  icon={Star} 
                  label="Starred" 
                  // Count filtered by starred logic not folder logic usually, but let's just count flagged items in current context
                  count={emails.filter(e => e.isStarred).length} 
                  active={currentFolder === 'starred'}
                  onClick={() => setCurrentFolder('starred')} // Not implemented fully as a folder but as a filter in real app
                />
                <SidebarItem icon={File} label="Draft" count={getCount('draft')} active={currentFolder === 'draft'} onClick={() => setCurrentFolder('draft')} />
                <SidebarItem icon={Send} label="Sent Mail" count={0} active={currentFolder === 'sent'} onClick={() => setCurrentFolder('sent')} />
                <SidebarItem icon={Trash2} label="Trash Mail" count={getCount('trash')} active={currentFolder === 'trash'} onClick={() => setCurrentFolder('trash')} />
                <SidebarItem icon={AlertCircle} label="Spam" count={getCount('spam')} active={currentFolder === 'spam'} onClick={() => setCurrentFolder('spam')} />
              </div>

              <div className="px-6 mb-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Labels</h3>
              </div>
              <LabelItem color="bg-blue-500" label="Social" onClick={() => { setCurrentFolder('inbox'); setActiveTab('Social'); }} />
              <LabelItem color="bg-orange-500" label="Promotions" onClick={() => { setCurrentFolder('inbox'); setActiveTab('Promotions'); }} />
              <LabelItem color="bg-emerald-500" label="Updates" onClick={() => { setCurrentFolder('inbox'); setActiveTab('Updates'); }} />
              <LabelItem color="bg-teal-500" label="Forums" onClick={() => { setCurrentFolder('inbox'); setActiveTab('Forums'); }} />
            </nav>

            {/* Storage Widget */}
            <div className="p-6 mt-auto">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold px-2 py-0.5 bg-slate-800 rounded">FREE</span>
              </div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Storage</h4>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-emerald-500 w-[46%]" />
              </div>
              <p className="text-xs text-slate-500">7.02 GB (46%) of 15 GB used</p>
            </div>
          </aside>

          {/* --- Main Content --- */}
          <main className="flex-1 flex flex-col min-w-0 bg-slate-900">
            
            {/* Top Toolbar */}
            <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div 
                  onClick={handleSelectAll}
                  className={`w-5 h-5 mx-2 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${selectedIds.size > 0 && selectedIds.size === displayedEmails.length ? 'bg-rose-500 border-rose-500' : 'border-slate-600 hover:border-slate-400'}`}
                >
                  {selectedIds.size > 0 && <Check size={14} className="text-white" />}
                </div>
                
                <div className="h-6 w-px bg-slate-800 mx-2" />
                
                <ToolbarButton icon={RotateCcw} label="Refresh" onClick={() => setEmails([...emails])} />
                <ToolbarButton icon={AlertCircle} label="Mark as Spam" onClick={handleMarkSpam} />
                <ToolbarButton icon={Trash2} label="Delete" onClick={handleMoveToTrash} />
                
                <div className="h-6 w-px bg-slate-800 mx-2" />
                
                <ToolbarDropdown icon={Folder} label="Move to" />
                <ToolbarDropdown icon={Tag} label="Label" />
                <ToolbarDropdown icon={MoreHorizontal} label="More" />
              </div>

              <div className="flex items-center text-sm text-slate-400">
                <span className="mr-4">
                  Showing {displayedEmails.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0}-
                  {Math.min(page * ITEMS_PER_PAGE, filteredEmails.length)} of {filteredEmails.length}
                </span>
                <div className="flex border border-slate-700 rounded-md overflow-hidden">
                   <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <ChevronLeft size={16} />
                   </button>
                   <button 
                      onClick={() => setPage(p => (p * ITEMS_PER_PAGE < filteredEmails.length ? p + 1 : p))}
                      disabled={page * ITEMS_PER_PAGE >= filteredEmails.length}
                      className="p-2 hover:bg-slate-800 border-l border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <ChevronRight size={16} />
                   </button>
                </div>
              </div>
            </div>

            {/* Tabs (Only visible in Inbox) */}
            {currentFolder === 'inbox' && (
              <div className="flex items-center border-b border-slate-800 px-4 pt-4 bg-slate-900">
                {['Primary', 'Social', 'Promotions', 'Updates', 'Forums'].map((tab) => {
                  const TabIcon = {
                    'Primary': Inbox, 'Social': Menu, 'Promotions': Tag, 'Updates': AlertCircle, 'Forums': MoreHorizontal
                  }[tab] || Inbox;

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-colors
                        ${activeTab === tab 
                          ? 'border-rose-500 text-rose-500' 
                          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-t-lg'}
                      `}
                    >
                      <TabIcon size={16} />
                      {tab}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Email List */}
            <div className="flex-1 overflow-y-auto">
              {displayedEmails.length > 0 ? (
                displayedEmails.map((email) => (
                  <EmailRow 
                    key={email.id} 
                    email={email} 
                    selected={selectedIds.has(email.id)}
                    onToggleSelect={() => handleSelect(email.id)}
                    onToggleStar={() => handleToggleStar(email.id)}
                    onToggleImportant={() => handleToggleImportant(email.id)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Inbox size={48} className="mb-4 opacity-50" />
                  <p className="text-lg font-medium">No emails found</p>
                  <p className="text-sm">Your {currentFolder} is empty.</p>
                </div>
              )}
            </div>

          </main>
        </div>
      </Section>

      <ComposeModal 
        isOpen={composeOpen} 
        onClose={() => setComposeOpen(false)} 
        onSend={handleSendEmail} 
      />
    </Container>
  );
}