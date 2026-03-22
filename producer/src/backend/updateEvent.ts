export class UpdateEvent {
  private listeners = new Set<() => void>();

  addListener(fn: () => void) {
    this.listeners.add(fn);
  }

  removeListener(fn: () => void) {
    this.listeners.delete(fn);
  }

  invoke() {
    for (const fn of this.listeners) fn();
  }
}
