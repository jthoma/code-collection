class OpenApiFormatValidator {
  static validate(format, value) {
    switch (format) {
      case 'email':
        return this.isEmail(value);
      case 'password':
        return this.isPassword(value);
      case 'ipv4':
        return this.isIPv4(value);
      case 'ipv6':
        return this.isIPv6(value);
      case 'uri':
        return this.isURI(value);
      case 'uri-reference':
        return this.isUriReference(value);
      case 'date':
        return this.isDate(value);
      case 'date-time':
        return this.isDateTime(value);
      case 'byte':
        return this.isBase64(value);
      case 'binary':
        return this.isBinary(value);
      default:
        return false;
    }
  }

  static isEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  static isPassword(value) {
    // Example: at least 8 characters
    return typeof value === 'string' && value.length >= 8;
  }

  static isIPv4(value) {
    const regex = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){2}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    return regex.test(value);
  }

  static isIPv6(value) {
    const regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1)$/;
    return regex.test(value);
  }

  static isURI(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  static isUriReference(value) {
    // Accepts both full and relative URIs
    try {
      new URL(value, 'http://example.com'); // relative URIs are valid with base
      return true;
    } catch {
      return false;
    }
  }

  static isDate(value) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  static isDateTime(value) {
    const date = new Date(value);
    return !isNaN(date.getTime()) && /\d{4}-\d{2}-\d{2}T/.test(value);
  }

  static isBase64(value) {
    const regex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;
    return regex.test(value);
  }

  static isBinary(value) {
    if (typeof value !== 'string') return false;
    return !/^[\x20-\x7E]*$/.test(value); // non-printable ASCII check
  }
}

module.exports = OpenApiFormatValidator;
