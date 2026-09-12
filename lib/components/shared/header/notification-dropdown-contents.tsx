import { ArrowRight } from "lucide-react";
import { Avatar, Button } from "../../..";

export interface NotificationItem {
    id?: number;
    title: string;
    action?: string;
    content: string;
    avatarType?: "image" | "initial";
    avatarSrc?: string;
    isUnread?: boolean;
    initial?: string;
    initialBg?: string;
    onClick?: () => void;
}

export interface NotificationDropdownContentsProps {
    notifications: NotificationItem[];
    handleClearAll?: () => void;
    handleViewAll?: () => void;
}

export default function NotificationDropdownContents({ notifications, handleClearAll, handleViewAll }: NotificationDropdownContentsProps) {
    return (
        <div className="w-full max-w-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                    Notifications
                </h2>

                <button className="text-sm dark:text-slate-400 text-slate-700 hover:text-slate-500 dark:hover:text-white underline decoration-slate-500 transition-colors" onClick={handleClearAll}>
                    Clear All
                </button>
            </div>

            {/* Notification List */}
            <div>
                {notifications.map((notification, index) => (
                    <div
                        key={notification.id || index}
                        className="group hover:bg-background transition-colors cursor-pointer flex gap-4 px-5 py-3 border-b border-slate-200 dark:border-slate-700"
                        onClick={notification.onClick}
                    >
                        {/* Avatar */}
                        {notification.avatarType && (
                            <div className="shrink-0">
                                {notification.avatarType === "image" &&
                                    notification.avatarSrc ? (
                                    <Avatar
                                        src={notification.avatarSrc}
                                        alt={notification.title}
                                        size="sm"
                                        shape="circle"
                                    />
                                ) : notification.avatarType === "initial" &&
                                    notification.initial ? (
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm text-white ${notification.initialBg ||
                                            "bg-gray-500"
                                            }`}
                                    >
                                        {notification.initial}
                                    </div>
                                ) : null}
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm leading-snug">
                                <span className="font-bold text-black dark:text-white">
                                    {notification.title}
                                </span>

                                {notification.action && (
                                    <span className="text-slate-500 dark:text-slate-400">
                                        {" "}
                                        {notification.action}
                                    </span>
                                )}
                            </p>

                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                                {notification.content}
                            </p>
                        </div>

                        {/* Unread Dot */}
                        {notification.isUnread && (
                            <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4">
                <Button variant="primary" className="w-full" size="sm" onClick={handleViewAll}>
                    View All Notification
                    <ArrowRight size={18} className="ml-2" />
                </Button>
            </div>
        </div>
    );
}