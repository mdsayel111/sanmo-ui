import { NotificationItem } from "../../lib/components/shared/header/notification-dropdown-contents";

export const notifications: NotificationItem[] = [
    {
        id: 1,
        title: "Josephine Thompson",
        action: "commented on admin panel",
        content: '"Wow 😍! this admin looks good and awesome design"',
        avatarType: "image",
        avatarSrc: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        isUnread: true,
    },
    {
        id: 2,
        title: "Donoghue Susan",
        content: "Hi, How are you? What about our next meeting",
        avatarType: "initial",
        initial: "D",
        initialBg: "bg-teal-700",
        isUnread: true,
    },
    {
        id: 3,
        title: "Jacob Gines",
        content: "Answered to your comment on the cash flow report",
        avatarType: "image",
        avatarSrc: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        isUnread: false,
    },
    {
        title: "System Update",
        content: "Your dashboard has been updated successfully.",
    },
];
