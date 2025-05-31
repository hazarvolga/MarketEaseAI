
export interface Contact {
  id: string;
  name: string;
  email: string;
  lists: string[];
  dateAdded: string;
  company?: string;
  phone?: string;
  jobTitle?: string;
  notes?: string;
}

export const contactsMock: Contact[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', lists: ['Newsletter Subscribers', 'Potential Leads'], dateAdded: '2023-10-01', company: 'Innovatech Solutions', jobTitle: 'Marketing Manager' },
  { id: '2', name: 'Alice Smith', email: 'alice.smith@example.com', lists: ['Newsletter Subscribers'], dateAdded: '2023-09-15', company: 'ArchStruct Inc.', jobTitle: 'Lead Architect' },
  { id: '3', name: 'Robert Johnson', email: 'robert.j@example.com', lists: ['VIP Clients'], dateAdded: '2023-08-20', company: 'DesignPro Ltd.', jobTitle: 'CEO' },
  { id: '4', name: 'Emily White', email: 'emily.white@example.com', lists: ['Newsletter Subscribers', 'Event Attendees'], dateAdded: '2023-10-05', company: 'BuildWell Group', jobTitle: 'Project Coordinator' },
  { id: '5', name: 'Michael Brown', email: 'michael.b@example.net', lists: ['Potential Leads'], dateAdded: '2023-11-01', company: 'Tech Solutions LLC', jobTitle: 'Sales Representative' },
];
