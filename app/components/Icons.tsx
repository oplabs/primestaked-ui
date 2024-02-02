export const ExternalLink = ({ size = 14 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className="fill-current"
  >
    <path d="M676.413-613.239 247.348-184.174Q234.674-171.5 215.522-171.5t-31.826-12.674Q171.022-196.848 171.022-216t12.674-31.826l429.065-429.065H401.913q-19.152 0-32.326-13.174t-13.174-32.326q0-19.153 13.174-32.327 13.174-13.173 32.326-13.173h320q19.152 0 32.326 13.173 13.174 13.174 13.174 32.327v320q0 19.152-13.174 32.326t-32.326 13.174q-19.152 0-32.326-13.174t-13.174-32.326v-210.848Z" />
  </svg>
)

export const SyncIcon = ({ size = 28 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className="fill-current -rotate-45"
  >
    <path d="M292.308-147.692 120-320l172.308-172.308L320.846-464l-124 124H800v40H196.846l124 124-28.538 28.308Zm375.384-320L639.154-496l124-124H160v-40h603.154l-124-124 28.538-28.308L840-640 667.692-467.692Z" />
  </svg>
)

export const CheckCircle = ({ size = 24 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className="fill-current"
  >
    <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
  </svg>
)

export const Close = ({ size = 24 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className="fill-current"
  >
    <path d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z" />
  </svg>
)

export const Info = ({ size = 24 }: { size?: number }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className="fill-current"
  >
    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
  </svg>
)

export const CaretDown = ({
  size = 14,
  className
}: {
  size?: number
  className?: string
}) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 16 16"
    className={`fill-current${className ? ` ${className}` : ''}`}
  >
    <path d="M7.36777 12.6322C7.71595 12.9804 8.27896 12.9804 8.62344 12.6322L15.7389 5.5205C16.087 5.17232 16.087 4.60931 15.7389 4.26484C15.3907 3.92036 14.8277 3.91666 14.4832 4.26484L8.00116 10.7469L1.51541 4.26113C1.16723 3.91296 0.604221 3.91296 0.259747 4.26113C-0.0847277 4.60931 -0.0884317 5.17232 0.259747 5.5168L7.36777 12.6322Z" />
  </svg>
)

export const ArrowDropUp = ({
  size = 24,
  className
}: {
  size?: number
  className?: string
}) => (
  <svg
    height={size}
    width={size}
    viewBox="0 -960 960 960"
    className={`fill-current${className ? ` ${className}` : ''}`}
  >
    <path d="m280-400 200-200 200 200H280Z" />
  </svg>
)

export const ArrowDown = ({
  size = 16,
  className
}: {
  size?: number
  className?: string
}) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 16 16"
    className={`fill-current${className ? ` ${className}` : ''}`}
  >
    <path d="M7.37563 15.7357C7.53634 15.9036 7.76134 16 7.99706 16C8.23277 16 8.4542 15.9036 8.61848 15.7357L14.6185 9.45C14.9471 9.10714 14.9328 8.56429 14.5899 8.23929C14.2471 7.91429 13.7042 7.925 13.3792 8.26786L8.8542 13.0036V0.857143C8.8542 0.382143 8.47206 0 7.99706 0C7.52206 0 7.13991 0.382143 7.13991 0.857143V13.0036L2.61849 8.26429C2.28991 7.92143 1.75063 7.91071 1.40777 8.23571C1.06491 8.56071 1.0542 9.10357 1.3792 9.44643L7.3792 15.7321L7.37563 15.7357Z" />
  </svg>
)

export const ProfileIcon = ({ size = 28 }: { size?: number }) => (
  <svg height={size} width={size}>
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      height={size}
      width={size}
      transform="translate(5.027366025864346 -4.293411811107908) rotate(396.9 12 12)"
      fill="#248ce1"
    />
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      height={size}
      width={size}
      transform="translate(-13.073541172731897 -6.82856616407962) rotate(302.7 12 12)"
      fill="#018c75"
    />
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      height={size}
      width={size}
      transform="translate(16.050690924033145 -8.460815358743934) rotate(340.3 12 12)"
      fill="#f70e01"
    />
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      height={size}
      width={size}
      transform="translate(16.17389640914339 -18.128396581385015) rotate(370.3 12 12)"
      fill="#15c6f2"
    />
  </svg>
)

export const Spinner = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    className="animate-spin"
  >
    <g>
      <path
        fill="currentColor"
        d="M478.71 364.58zm-22 6.11l-27.83-15.9a15.92 15.92 0 0 1-6.94-19.2A184 184 0 1 1 256 72c5.89 0 11.71.29 17.46.83-.74-.07-1.48-.15-2.23-.21-8.49-.69-15.23-7.31-15.23-15.83v-32a16 16 0 0 1 15.34-16C266.24 8.46 261.18 8 256 8 119 8 8 119 8 256s111 248 248 248c98 0 182.42-56.95 222.71-139.42-4.13 7.86-14.23 10.55-22 6.11z"
      />
      <path
        fill="currentColor"
        d="M271.23 72.62c-8.49-.69-15.23-7.31-15.23-15.83V24.73c0-9.11 7.67-16.78 16.77-16.17C401.92 17.18 504 124.67 504 256a246 246 0 0 1-25 108.24c-4 8.17-14.37 11-22.26 6.45l-27.84-15.9c-7.41-4.23-9.83-13.35-6.2-21.07A182.53 182.53 0 0 0 440 256c0-96.49-74.27-175.63-168.77-183.38z"
        className="opacity-25"
      />
    </g>
  </svg>
)
