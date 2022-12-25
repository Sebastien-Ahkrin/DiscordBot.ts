import dotenv from 'dotenv';
dotenv.config();

class Env {
  public schema<T extends Object>(schema: T) {
    const object: Record<string, any> = {};

    for (const [key, value] of Object.entries(schema)) {
      object[key] = this.changeToType(process.env[key], value);
    }

    return object as T;
  }

  private changeToType(value: any, type: 0 | 'string') {
    switch (type) {
      case 'string':
        return String(value);
      case 0:
        return Number(value);
      default:
        throw new Error('unreachable');
    }
  }
}

class Schema {
  public string(): string {
    return 'string';
  }

  public number(): number {
    return 0;
  }
}

const schema = new Schema();

export default new Env();
export { schema };
