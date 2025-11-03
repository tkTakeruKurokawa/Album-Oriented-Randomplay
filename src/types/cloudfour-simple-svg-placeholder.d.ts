declare module '@cloudfour/simple-svg-placeholder' {
  interface SvgPlaceholderOptions {
    width?: number;
    height?: number;
    text?: string;
    fontFamily?: string;
    fontWeight?: number;
    fontSize?: number;
    dy?: number;
    bgColor?: string;
    textColor?: string;
    dataUri?: boolean;
  }

  function simpleSvgPlaceholder(options?: SvgPlaceholderOptions): string;

  export = simpleSvgPlaceholder;
}
