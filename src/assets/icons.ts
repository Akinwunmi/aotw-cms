import { Icon } from './icon.model';

export const icons: Icon[] = [
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Add Icon</title>
        <path
          d="M7.75 1.25L10.25 1.25L10.25 7.75L16.75 7.75L16.75 10.25L10.25 10.25L10.25 16.75L7.75 16.75L7.75 10.25L1.25 10.25L1.25 7.75L7.75 7.75Z"
          fill="currentColor"
        />
      </svg>
    `,
    name: 'add'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Arrow Down Icon</title>
        <path
          d="M1.25 6L3 4.25L9 10.25L15 4.25L16.75 6L9 13.75Z"
          fill="currentColor"
        />
      </svg>
    `,
    name: 'arrow-down'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Arrow Up Icon</title>
        <path
          d="M16.75 12L15 13.75L9 7.75L3 13.75L1.25 12L9 4.25Z"
          fill="currentColor"
        />
      </svg>
    `,
    name: 'arrow-up'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Check Icon</title>
        <path
          d="M0 8.5L2 6.5L7 11.5L16 2.5L18 4.5L7 15.5Z"
          fill="currentColor"
        />
      </svg>
    `,
    name: 'check'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Close Icon</title>
        <path
          d="M1.25 3L3 1.25L9 7.25L15 1.25L16.75 3L10.75 9L16.75 15L15 16.75L9 10.75L3 16.75L1.25 15L7.25 9Z"
          fill="currentColor"
        />
      </svg>
    `,
    name: 'close'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Dot Icon</title>
        <circle cx="9" cy="9" r="2" fill="currentColor" />
      </svg>
    `,
    name: 'dot'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Edit Icon</title>
        <path d="M8 1L17 1L17 17L1 17L1 8L3 8L3 15L15 15L15 3L8 3Z" fill="currentColor" />
        <path d="M0 3L3 0L11 8L13 13L8 11Z" fill="currentColor" />
      </svg>
    `,
    name: 'edit'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <line x1="9" y1="19" x2="22" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        <line x1="2" y1="19" x2="5" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        <circle cx="7" cy="19" r="2" stroke="currentColor" stroke-width="2"/>
        <circle cx="17" cy="12" r="2" stroke="currentColor" stroke-width="2"/>
        <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        <line x1="2" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        <circle cx="7" cy="5" r="2" stroke="currentColor" stroke-width="2"/>
        <line x1="9" y1="5" x2="22" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        <line x1="2" y1="5" x2="5" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
      </svg>
    `,
    name: 'filter'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <title>Grid Icon</title>
        <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>  
    `,
    name: 'grid'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <title>List Icon</title>
        <rect x="3" y="3" width="18" height="7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <rect x="3" y="14" width="18" height="7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    `,
    name: 'list'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Archive of the World Logo</title>
        <circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="2"/>
        <rect x="1" y="8.25" width="16" height="1.5" fill="currentColor" />
        <path
          d="M7.8708 1.67173C8.07652 1.44336 8.24642 1.25475 8.39999 1.04999L9.59999 1.94999C9.40453 2.21061 9.16312 2.47883 8.9341 2.73328C8.84425 2.83311 8.75631 2.93082 8.6738 3.02512C8.36134 3.38221 8.0527 3.76779 7.77463 4.24978C7.22656 5.19978 6.74999 6.60723 6.74999 8.99999C6.74999 11.5126 6.38685 13.0246 5.61997 13.8767C4.83119 14.7531 3.77322 14.7513 3.07498 14.7501C3.0495 14.75 3.02449 14.75 3 14.75V13.25C3.80436 13.25 4.1976 13.2149 4.50502 12.8733C4.86314 12.4754 5.24999 11.4874 5.24999 8.99999C5.24999 6.39274 5.77343 4.71686 6.47535 3.5002C6.82228 2.89885 7.20114 2.43027 7.54494 2.03736C7.66341 1.90196 7.77129 1.7822 7.8708 1.67173Z"
          fill="currentColor"
        />
        <path
          d="M13.495 12.8733C13.8024 13.2149 14.1956 13.25 15 13.25L15 14.75C14.9755 14.75 14.9505 14.75 14.925 14.7501C14.2268 14.7513 13.1688 14.7531 12.38 13.8767C11.6131 13.0246 11.25 11.5126 11.25 9C11.25 6.60725 10.7734 5.19979 10.2254 4.24979C9.9473 3.76781 9.63865 3.38222 9.3262 3.02513C9.24368 2.93083 9.15574 2.83312 9.06589 2.73329C8.83688 2.47884 8.59547 2.21063 8.4 1.95L9.6 1.05C9.75357 1.25476 9.92347 1.44337 10.1292 1.67175C10.2287 1.78221 10.3366 1.90198 10.4551 2.03737C10.7989 2.43028 11.1777 2.89886 11.5246 3.50021C12.2266 4.71688 12.75 6.39276 12.75 9C12.75 11.4874 13.1369 12.4754 13.495 12.8733Z"
          fill="currentColor"
        />
      </svg>
    `,
    name: 'logo'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Menu Icon</title>
        <rect x="1" y="3" width="16" height="2" fill="currentColor" />
        <rect x="1" y="8" width="16" height="2" fill="currentColor" />
        <rect x="1" y="13" width="16" height="2" fill="currentColor" />
      </svg>  
    `,
    name: 'menu'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Search Icon</title>
        <circle cx="6.75" cy="6.75" r="5" stroke="currentColor" stroke-width="2" />
        <path d="M9 11L11 9L17 15L15 17Z" fill="currentColor" />
      </svg>  
    `,
    name: 'search'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
        <title>Shine Icon</title>
        <defs>
          <g id="sparks">
            <rect x="7.5" y="0" width="3" height="5" fill="currentColor" />
            <rect x="7.5" y="13" width="3" height="5" fill="currentColor" />
          </g>
        </defs>
        <use xlink:href="#sparks" />
        <use xlink:href="#sparks" transform="rotate(60 9 9)" />
        <use xlink:href="#sparks" transform="rotate(-60 9 9)" />
      </svg>
    `,
    name: 'shine'
  },
  {
    data: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <line x1="2" y1="5" x2="22" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        <line x1="2" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        <line x1="2" y1="19" x2="8" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
      </svg>
    `,
    name: 'sort'
  }
];
