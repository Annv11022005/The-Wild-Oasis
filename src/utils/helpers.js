import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns';

// Chúng tôi muốn làm cho chức năng này hoạt động cho cả đối tượng Date và chuỗi (có nguồn gốc từ Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase cần một chuỗi ngày ISO. Tuy nhiên, chuỗi đó sẽ khác nhau ở mỗi lần kết xuất vì MS hoặc SEC đã thay đổi, điều này không tốt. Vì vậy, chúng tôi sử dụng thủ thuật này để xóa bất kỳ thời gian nào
export const getToday = function (options = {}) {
  const today = new Date();

  // Điều này là cần thiết để so sánh với created_at từ Supabase, vì nó không phải là 0.0.0.0, do đó chúng ta cần đặt ngày là END của ngày khi chúng ta so sánh với những ngày trước đó
  if (options?.end)
    // Đặt ở giây cuối cùng của ngày
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
