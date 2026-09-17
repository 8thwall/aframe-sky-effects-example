declare module './assets/*' {
  const content: string
  export default content
}

declare module '../assets/*' {
  const content: string
  export default content
}

declare module '../../assets/*' {
  const content: string
  export default content
}

declare module '../../../assets/*' {
  const content: string
  export default content
}

declare module '../../../../assets/*' {
  const content: string
  export default content
}

declare module '../../../../../assets/*' {
  const content: string
  export default content
}

declare module '../../../../../../assets/*' {
  const content: string
  export default content
}

declare module '*.html?raw' {
  const content: string
  export default content
}

declare module '*.html' {
  const content: string
  export default content
}

