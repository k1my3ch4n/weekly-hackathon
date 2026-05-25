export interface DueDateInfo {
  label: string;
  isOverdue: boolean;
}

export function formatDueDate(dueDate: string): DueDateInfo {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parts = dueDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return { label: dueDate, isOverdue: false };
  }
  const due = new Date(parts[0], parts[1] - 1, parts[2]);

  const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  let label: string;
  if (diffDays === 0) {
    label = '오늘';
  } else if (diffDays === 1) {
    label = '내일';
  } else if (diffDays === -1) {
    label = '어제';
  } else if (diffDays > 1) {
    label = `${diffDays}일 후`;
  } else {
    label = `${Math.abs(diffDays)}일 전`;
  }

  return { label, isOverdue: diffDays < 0 };
}
