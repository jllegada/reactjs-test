// ─────────────────────────────────────────────────────────────────────────
// types.ts — shared TypeScript types, kept in their own file so every
// component that needs to know what a "Contact" looks like can import the
// same definition instead of redefining it.
//
// TypeScript fundamentals covered here:
//   - `type` alias — giving a name to the shape of some data
//   - primitive types — number, string
// ─────────────────────────────────────────────────────────────────────────

// A "type alias" describes the shape an object must have. From this point
// on, TypeScript knows that anything typed `Contact` must have exactly
// these four fields, with exactly these types. If code tries to create a
// Contact missing a field, or with e.g. a number where a string is
// expected, TypeScript flags it as an error before the app ever runs.
export type Contact = {
  id: number
  name: string
  email: string
  message: string
}
