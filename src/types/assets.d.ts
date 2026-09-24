/**
 * Metro turns an imported image into an asset module id, which is what the
 * Image `source` prop takes. TypeScript needs to be told that by hand.
 */

declare module "*.png" {
  const asset: number;
  export default asset;
}
