/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.md' {
  const content: string
  export default content
}
