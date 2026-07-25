// packages/ui/src/components/icons/registry.ts
import {
  // Navigation & Layout
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Home,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,

  // Actions
  Download,
  Share,
  ExternalLink,
  Copy,
  Upload,

  // Media & Audio
  Play,
  Pause,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,

  // File types
  FileText,
  FileSpreadsheet,
  Archive,

  // Communication
  Mail,
  Phone,
  MapPin,

  // Calendar & Time
  Calendar,
  Clock,

  // Status & Feedback (Alerts)
  Info,
  CheckCircle,
  AlertCircle,
  XCircle,
  AlertTriangle,

  // Data & Achievements
  Award,
  Trophy,
  Users,
  User,

  // Additional (nice to have)
  BookOpen,
  Building,
  Camera,
  Music,
  Flag,
  Code,
  Minus,
} from 'lucide-react';

export const iconRegistry = {
  // Navigation & Layout
  menu: Menu,
  close: X,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  search: Search,
  home: Home,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,

  // Actions
  download: Download,
  share: Share,
  'external-link': ExternalLink,
  copy: Copy,
  upload: Upload,

  // Media & Audio
  play: Play,
  pause: Pause,
  rewind: Rewind,
  'fast-forward': FastForward,
  'volume-2': Volume2,
  'volume-x': VolumeX,

  // File types
  'file-text': FileText,
  'file-spreadsheet': FileSpreadsheet,
  archive: Archive,

  // Communication
  mail: Mail,
  phone: Phone,
  'map-pin': MapPin,

  // Calendar & Time
  calendar: Calendar,
  clock: Clock,

  // Status & Feedback
  info: Info,
  'check-circle': CheckCircle,
  'alert-circle': AlertCircle,
  'x-circle': XCircle,
  'alert-triangle': AlertTriangle,

  // Data & Achievements
  award: Award,
  trophy: Trophy,
  users: Users,
  user: User,

  // Additional
  'book-open': BookOpen,
  building: Building,
  camera: Camera,
  music: Music,
  flag: Flag,
  code: Code,
  minus: Minus,
} as const;

export type IconName = keyof typeof iconRegistry;
