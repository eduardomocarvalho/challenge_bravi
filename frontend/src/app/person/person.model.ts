export interface Contact {
  type: string;
  value: string;
}

export interface Person {
  id: string;
  name: string;
  contacts: Contact[];
}
