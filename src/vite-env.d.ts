/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID: string
  // add more env variables types here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
