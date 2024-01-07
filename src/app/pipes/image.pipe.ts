import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {
  public transform(name: string, prefix?: string, suffix?: string): string {
    if (!name) {
      return '';
    }

    const parsedId = name.replaceAll('-', '/');

    return `${prefix ? prefix + '/' : ''}${parsedId}${suffix || ''}.svg`;
  }
}
