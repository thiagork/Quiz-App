import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'htmlDecode'})
export class HtmlDecode implements PipeTransform {
    transform(input: string): string {
        const doc = new DOMParser().parseFromString(input, 'text/html');
        return doc.documentElement.textContent;
    }
}
