interface IDua {
  DuaID: number;
  ArabicAudio: string;
  DescLanguageName: string;
  ErrorID: number;
  ErrorText: string;
  HowToRead: string;
  KeywordText: string;
  LongDescription: string;
  Script: string;
  ShortDescription: string;
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

interface IDuaItem {
  DuaID: number;
  ErrorID: number;
  ErrorText: string;
  IndexID: number;
  ParentID: number;
  ShortDescription: string;
  Title: string;
}

interface ICategory {
  id: string;
  name: string;
  description: string;
  image: string;
}
