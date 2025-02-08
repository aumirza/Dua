interface IDuaBase {
  DuaID: number;
  ShortDescription: string;
}

interface IDua extends IDuaBase {
  ArabicAudio: string;
  DescLanguageName: string;
  ErrorID: number;
  ErrorText: string;
  HowToRead: string;
  KeywordText: string;
  LongDescription: string;
  Script: string;
  TransLanguageName: string;
  Translation: string;
  TranslationAudio: string;
  Transliteration: string;
  WhatIsItFor: string;
  WhenToRead: string;
  WhereToRead: string;
  WhoReadItHistory: string;
  WhyToRead: string;
}

interface IDuaItem extends IDuaBase {
  ErrorID: number;
  ErrorText: string;
  IndexID: number;
  ParentID: number;
  Title: string;
}

interface ICategory {
  id: string;
  name: string;
  description: string;
  image: string;
}
