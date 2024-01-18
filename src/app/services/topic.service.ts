import { Injectable } from '@angular/core';

import { Topic, TopicWithRange } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  public setImageRange(topic: Topic, selectedYear: number): TopicWithRange {
    const { ranges } = topic;

    if (!ranges) {
      return topic;
    }

    if (ranges.length === 1) {
      const { start, end, image } = ranges.slice(-1)[0];
      return {
        ...topic,
        image: image ?? topic.image,
        rangeSuffix: `_${start}-${end || ''}`
      };
    }

    const range = ranges.reduce((prev, curr) => {
      if (curr.start && selectedYear - curr.start >= 0) {
        return curr;
      }
      if (prev.start && selectedYear - prev.start >= 0) {
        return prev;
      }
      return {};
    });

    const { start, end, image, imageUrl } = range;
    return {
      ...topic,
      image: !!image ?? topic.image,
      imageUrl: imageUrl ?? topic.imageUrl,
      rangeSuffix: start ? `_${start}-${end || ''}` : undefined
    };
  }
}
