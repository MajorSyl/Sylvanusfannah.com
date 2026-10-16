import { budgetOptions, services, timelineOptions } from "@/content";

export const serviceLabel = (id: string) => services.categories.find((c) => c.id === id)?.title.en ?? id;
export const budgetLabel = (v: string) => budgetOptions.find((o) => o.value === v)?.label.en ?? v;
export const timelineLabel = (v: string) => timelineOptions.find((o) => o.value === v)?.label.en ?? v;
