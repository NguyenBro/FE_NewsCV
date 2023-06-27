export class ComFrame {
  id: string;
  name: string;
  description: string;
  competences: string[];
  constructor(clone?: ComFrame) {
    if (clone) {
      this.id = clone.id;
      this.name = clone.name;
      this.description = clone.description;
      this.competences = [...clone.competences];
    } else {
      this.id = '';
      this.name = '';
      this.description = '';
      this.competences = [];
    }
  }
}

