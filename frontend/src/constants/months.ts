type MonthReference = {
  reference: string;
  month: string;
};

export const MONTHS: MonthReference[] = [
  { reference: "01", month: "January" },
  { reference: "02", month: "February" },
  { reference: "03", month: "March" },
  { reference: "04", month: "April" },
  { reference: "05", month: "May" },
  { reference: "06", month: "June" },
  { reference: "07", month: "July" },
  { reference: "08", month: "August" },
  { reference: "09", month: "September" },
  { reference: "10", month: "October" },
  { reference: "11", month: "November" },
  { reference: "12", month: "December" },
] as const;
