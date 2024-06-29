/* eslint-disable max-lines */
import { Icon } from '@flagarchive/angular';

export const ICONS: Icon[] = [
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 4L12 20M12 20L18 14M12 20L6 14"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>

    `,
    name: 'arrow-down',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 12L4 12M4 12L10 18M4 12L10 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>

    `,
    name: 'arrow-left',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 12H20M20 12L14 6M20 12L14 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'arrow-right',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 20V4M12 4L6 10M12 4L18 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'arrow-up',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 5L10 18.5L4 12"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'check',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 9L12 17L4 9"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'chevron-down',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 20L7 12L15 4"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'chevron-left',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 4L17 12L9 20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'chevron-right',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 15L12 7L20 15"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'chevron-up',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 12L19 5M12 12L5 5M12 12L5 19M12 12L19 19"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'close',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M8 2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2L8 2ZM6 4C6 4.55228
            6.44771 5 7 5C7.55228 5 8 4.55228 8 4L6 4ZM18 2C18 1.44772 17.5523 1 17 1
            C16.4477 1 16 1.44772 16 2H18ZM16 4C16 4.55228 16.4477 5 17 5C17.5523 5 18
            4.55228 18 4H16ZM3 4V3C2.44772 3 2 3.44772 2 4H3ZM21 4H22C22 3.44772 21.5523 3
            21 3V4ZM21 21V22C21.5523 22 22 21.5523 22 21H21ZM3 21H2C2 21.5523 2.44772 22 3
            22V21ZM16 15C16 15.5523 15.5523 16 15 16V18C16.6569 18 18 16.6569 18 15H16ZM15
            16C14.4477 16 14 15.5523 14 15H12C12 16.6569 13.3431 18 15 18V16ZM14 15C14
            14.4477 14.4477 14 15 14V12C13.3431 12 12 13.3431 12 15H14ZM15 14C15.5523 14
            16 14.4477 16 15H18C18 13.3431 16.6569 12 15 12V14ZM6 2L6 4L8 4L8 2L6 2ZM16 2
            V4H18 V2H16ZM4 10L20 10V8L4 8L4 10ZM3 5H21V3H3V5ZM20 4V21H22V4H20ZM21 20H3V22
            H21V20ZM4 21V4H2V21H4Z
          "
          fill="currentColor"
        />
      </svg>
    `,
    name: 'event',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M10 5C10 6.10457 9.10457 7 8 7C6.89543 7 6 6.10457 6 5M10 5C10 3.89543 9.10457
            3 8 3C6.89543 3 6 3.89543 6 5M10 5L21 5M6 5L3 5M14 12C14 10.8954 14.8954 10 16
            10C17.1046 10 18 10.8954 18 12M14 12C14 13.1046 14.8954 14 16 14C17.1046 14 18
            13.1046 18 12M14 12H3M18 12H21M10 19C10 20.1046 9.10457 21 8 21C6.89543 21 6
            20.1046 6 19M10 19C10 17.8954 9.10457 17 8 17C6.89543 17 6 17.8954 6 19M10 19
            L21 19M6 19H3
          "
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'filter',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 4H4V10H10V4Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M20 4H14V10H20V4Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M20 14H14V20H20V14Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M10 14H4V20H10V14Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'grid',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 20V11M12 5H12.01"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'info',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.5 19.5L15.5 10.5L19.5 19.5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M9.5 6.5V4.5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M4.5 14.5C8 14.5 11.5 10 11.5 6.5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M13.5 14.5C11.1443 14.5 8.78854 12.4614 7.5 10.0613"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M4.5 6.5H13.5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M13 17H18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'language',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M14 5C13.4477 5 13 5.44772 13 6C13 6.55228 13.4477 7 14 7V5ZM18 6H19V5H18V6Z
            M17 10C17 10.5523 17.4477 11 18 11C18.5523 11 19 10.5523 19 10H17ZM18 18V19
            C18.5523 19 19 18.5523 19 18H18ZM6 18H5C5 18.5523 5.44772 19 6 19V18ZM6 6V5
            C5.44772 5 5 5.44772 5 6H6ZM10 7C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523
            5 10 5V7ZM19 14C19 13.4477 18.5523 13 18 13C17.4477 13 17 13.4477 17 14H19Z
            M11.2929 11.2929C10.9024 11.6834 10.9024 12.3166 11.2929 12.7071C11.6834
            13.0976 12.3166 13.0976 12.7071 12.7071L11.2929 11.2929ZM14 7H18V5H14V7ZM17 6
            V10H19V6H17ZM18 17H6V19H18V17ZM7 18V6H5V18H7ZM6 7H10V5H6V7ZM17 14V18H19V14H17Z
            M17.2929 5.29289L11.2929 11.2929L12.7071 12.7071L18.7071 6.70711L17.2929
            5.29289Z
          "
          fill="currentColor"
        />
      </svg>
    `,
    name: 'link',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 4H4V10H20V4Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M20 14H4V20H20V14Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'list',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M16.5 9V8H8V16M8 13H16.5V12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3
            16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z
          "
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
      />
      </svg>
    `,
    name: 'logo',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 5H22M2 12H22M2 19H22"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'menu',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M6.99992 7.00009L7.70703 7.70719L7.70703 7.70719L6.99992 7.00009ZM15.9285
            6.1207L15.3729 6.95217L15.3729 6.95217L15.9285 6.1207ZM18.5329 14.7061L17.609
            14.3235L17.609 14.3235L18.5329 14.7061ZM15.3333 18.2363L14.8619 17.3544
            L14.8619 17.3544L15.3333 18.2363ZM10.6205 18.9354L10.4254 19.9162L10.4254
            19.9162L10.6205 18.9354ZM9.99998 9C10.5523 9 11 8.55228 11 8C11 7.44772
            10.5523 7 9.99998 7V9ZM5.99998 8L4.99998 8L4.99998 9H5.99998V8ZM6.99998 4
            C6.99998 3.44772 6.55226 3 5.99998 3C5.44769 3 4.99998 3.44772 4.99998 4
            L6.99998 4ZM7.70703 7.70719C8.70022 6.714 10.0071 6.0959 11.4049 5.95823
            L11.2089 3.96786C9.35055 4.15089 7.6132 4.9726 6.29282 6.29298L7.70703 7.70719
            ZM11.4049 5.95823C12.8027 5.82056 14.205 6.17182 15.3729 6.95217L16.4841
            5.28923C14.9315 4.25181 13.0672 3.78483 11.2089 3.96786L11.4049 5.95823Z
            M15.3729 6.95217C16.5408 7.73252 17.402 8.89367 17.8097 10.2378L19.7236
            9.65721C19.1815 7.87031 18.0367 6.32664 16.4841 5.28923L15.3729 6.95217Z
            M17.8097 10.2378C18.2174 11.5819 18.1465 13.0258 17.609 14.3235L19.4567
            15.0888C20.1713 13.3637 20.2656 11.4441 19.7236 9.65721L17.8097 10.2378Z
            M17.609 14.3235C17.0715 15.6211 16.1006 16.6923 14.8619 17.3544L15.8047
            19.1183C17.4515 18.238 18.7422 16.814 19.4567 15.0888L17.609 14.3235ZM14.8619
            17.3544C13.6232 18.0165 12.1932 18.2286 10.8156 17.9546L10.4254 19.9162
            C12.2568 20.2805 14.1579 19.9985 15.8047 19.1183L14.8619 17.3544ZM10.8156
            17.9546C9.43795 17.6806 8.19798 16.9374 7.30692 15.8516L5.7609 17.1204C6.9455
            18.5639 8.59395 19.5519 10.4254 19.9162L10.8156 17.9546ZM7.30692 15.8516
            C6.41586 14.7659 5.92883 13.4047 5.92883 12.0001L3.92883 12.0001C3.92883
            13.8674 4.5763 15.677 5.7609 17.1204L7.30692 15.8516ZM6.29282 6.29298L5.18169
            7.4041L6.59591 8.81831L7.70703 7.70719L6.29282 6.29298ZM9.99998 7H5.99998V9
            H9.99998V7ZM6.99998 8L6.99998 4L4.99998 4L4.99998 8L6.99998 8Z
          "
          fill="currentColor"
        />
      </svg>
    `,
    name: 'refresh',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 17V5M8 5L4 9M8 5L12 9"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M16.5 7L16.5 19M16.5 19L20.5 15M16.5 19L12.5 15"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'sort',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M9.71434 9.94286H3.77148L8.57148 13.8286L6.51434 20L12.0001 16.3429L17.4858 20
            L15.4286 13.8286L20.2286 9.94286H14.2858L12.0001 4L9.71434 9.94286Z
          "
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'star',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M9.71428 9.94286H3.77142L8.57142 13.8286L6.51428 20L12 16.3429L17.4857 20
            L15.4286 13.8286L20.2286 9.94286H14.2857L12 4L9.71428 9.94286Z
          "
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'star-fill',
  },
  {
    data: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="
            M5 6L15 6C17.2091 6 19 7.79086 19 10V13M22 11L19 14L16 11M19 18L9 18C6.79086
            18 5 16.2091 5 14L5 11M2 13L5 10L8 13
          "
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `,
    name: 'switch',
  },
];
