export function timeSince(date: number): string {
  let thisDate: any = new Date();
  var seconds: number = Math.floor((thisDate - date) / 1000);

  let interval = Math.floor(seconds / 60);
  if (interval > 1 && interval < 60) {
    return interval + " MINUTES";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1 && interval < 24) {
    if (interval == 1) {
      return interval + " HOUR";
    }
    return interval + " HOURS";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1 && interval < 30) {
    if (interval == 1) {
      return interval + " DAY";
    }
    return interval + " DAYS";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1 && interval < 12) {
    if (interval == 1) {
      return interval + " MONTH";
    }
    return interval + " MONTHS";
  }
  interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    if (interval == 1) {
      return interval + " YEAR";
    }
    return interval + " YEARS";
  }
  return Math.floor(seconds) + " SECONDS";
}
