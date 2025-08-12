export type PagePathType =
  | 'header'
  | 'footer'
  | 'home-page'
  | 'home-page-2'
  | 'homepages'
  | 'trust-center'
  | 'trust-center-soc'
  | 'trust-center-gdpr'
  | 'pricing'
  | 'customer'
  | 'startup-program'
  | 'about-us'
  | 'careers'
  | 'contact'
  | 'support'
  | 'whitepaper'
  | 'partnership'
  | 'solutions'
  | 'faq'
  | 'gh-event-page'
  | 'enterprise'
  | 'help-desk'
  | 'events'
  | 'blog'
  | 'blog-internal'
  | 'terms-of-service'
  | 'privacy-policy'
  | 'vdp'
  | 'brand-guideline'
  | 'vs-code-extension'
  | 'ides'
  | 'hoppy-corner'
  | 'comics'
  | 'comics-landing'
  | 'hoppyversions'
  | 'ides'
  | 'cursor'
  | 'windsurf'
  | 'visual-studio-code'
  | 'dpa'
  | 'case-study'
  | 'cases'
  | 'student-program';

export type ShapeType =
  | 'circle-dot1-sm'
  | 'circle-dot1'
  | 'circle-dot2-sm'
  | 'circle-dot2'
  | 'circle-dot3-sm'
  | 'circle-dot3'
  | 'circle-square1-sm'
  | 'circle-square1'
  | 'circle-square2-sm'
  | 'circle-square2'
  | 'circle-square3-sm'
  | 'circle-square3'
  | 'circle1-sm'
  | 'circle1'
  | 'circle2-sm'
  | 'circle2'
  | 'circle3-sm'
  | 'circle3'
  | 'halfmoon-1-sm'
  | 'halfmoon-1'
  | 'halfmoon-2'
  | 'halfmoon-opposite1-sm'
  | 'halfmoon-opposite1'
  | 'halfmoon-opposite2-sm'
  | 'halfmoon-opposite2'
  | 'halfmoon-opposite3-sm'
  | 'halfmoon-opposite3'
  | 'double-halfmoon-smaller1-sm'
  | 'double-halfmoon-smaller1'
  | 'double-halfmoon-smaller2-sm'
  | 'double-halfmoon-smaller2'
  | 'double-halfmoon-smaller3-sm'
  | 'double-halfmoon-smaller3'
  | 'double-halfmoon1-sm'
  | 'double-halfmoon1'
  | 'double-halfmoon2-sm'
  | 'double-halfmoon2'
  | 'double-halfmoon3-sm'
  | 'double-halfmoon3'
  | 'tiled-moon1-sm'
  | 'tiled-moon1'
  | 'tiled-moon2-sm'
  | 'tiled-moon2'
  | 'tiled-moon3-sm'
  | 'tiled-moon3'
  | 'code-shape-sm'
  | 'code_shape_vertical'
  | 'code-shape'
  | 'badge-sm'
  | 'badge'
  | 'calendar-sm'
  | 'calendar'
  | 'key-sm'
  | 'key'
  | 'lock-sm'
  | 'lock-md'
  | 'lock'
  | 'terminal-sm'
  | 'terminal'
  | 'users-sm'
  | 'users'
  | 'circle-square'
  | 'code-shape-half'
  | 'double-circle'
  | 'rabbit'
  | 'star'
  | 'rabbit-xl'
  | 'notes'
  | 'cloud';

export interface ApiPictureAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

export interface PictureData {
  id: number;
  attributes: ApiPictureAttributes;
}

export interface SinglePictureWrapper {
  data: PictureData;
}

export interface ArrayPictureWrapper {
  data: PictureData[];
}

export interface SiteMetadata {
  id: number;
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  og_url: string;
  og_title: string;
  og_description: string;
  og_sitename: string;
  og_locale: string;
  og_type: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_site: null | string;
  twitter_creator: null | string;
  og_image: SinglePictureWrapper;
  twitter_image: SinglePictureWrapper;
}

export type QuestionType = {
  Question: string;
  Answer: string;
};

export type FeatureItemType = {
  id: number;
  Title: string;
  Description: string;
};

export type ContactSelectOptionType = { id: number; Label: string; Value: string };

export type HandleChangeType = { [key: string]: string };

export type ArrowPositionType = 'left' | 'right';
export type ArrowRotationType = 'left' | 'right' | 'up' | 'down';

export type FaqType = {
  Question: string;
  Answer: string;
  Category: string;
};

export type SolutionFaqItem = {
  Title: string;
  Description: string;
  Faqs: FaqType[];
};
export interface HyperlinkProps {
  Text: string;
  HyperlinkText: string;
  HyperlinkUrl: string;
  isExternal: boolean;
}
export type StrapiButton = {
  Text: string;
  isExternal: boolean;
  id: string;
  Url: string;
  Image: StrapiImage;
  Hyperlink?: HyperlinkProps;
};

export type StrapiBullet = {
  id: number;
  Text: string;
  Description: string;
};

export type StrapiGetStarted = {
  Title: string;
  Buttons?: StrapiButton[];
  Description_1: string;
  Description_2: string;
  Image?: { data: { attributes: { url: string } } };
  ImageSM?: { data: { attributes: { url: string } } };
  ImageDark?: { data: { attributes: { url: string } } };
  ImageDarkSM?: { data: { attributes: { url: string } } };
  TextDetails: string;
};

export type OpenSourceProject = StrapiGetStarted;

export type StrapiImageImplFormats = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type StrapiImageImpl = {
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: {
    thumbnail: StrapiImageImplFormats;
    small: StrapiImageImplFormats;
    medium: StrapiImageImplFormats;
    large: StrapiImageImplFormats;
  };
};

export type StrapiImage = {
  data: {
    attributes: StrapiImageImpl;
  };
};

export type StrapiSimpleHero = {
  Title: string;
  Description: string;
  Buttons: StrapiButton[];
  CarouselWithTooltips: StrapiButton[];
  CarouselWithTooltipsDark: StrapiButton[];
};
export type Capsule = {
  Text: string;
  Url: string;
  isExternal: boolean;
};

export type StrapiHero = {
  Title: string;
  Description: string;
  Image: StrapiImage;
  Buttons: StrapiButton[];
  Tag: string;
  Capsule: Capsule;
  Bullets: StrapiBullet[];
  Description_1: string;
  Description_2: string;
  Description_3: string;
  BackedBy: string;
  BackedByImages: { data: StrapiImage[] };
  BackedByImagesDark: { data: StrapiImage[] };
  LottieLG: unknown;
  LottieSM: unknown;
};

export type HoppyHero = {
  Title: string;
  Description: string;
  Image: StrapiImage;
  ImageSM: StrapiImage;
};
export type HoppyCard = {
  Title: string;
  Description: string;
  Image: StrapiImage;
  Icon: StrapiImage;
};
export type QuoteBanner = {
  Title: string;
  Description: string;
  Button: StrapiButton;
  Versions: HoppyCard[];
  Socials: StrapiButton[];
  Creatives: Creatives[];
};
export type ComicData = {
  Title: string;
  Description: string;
  Button: StrapiButton;
  Image: StrapiImage;
};
export type Creatives = {
  id: number;
  Title: string;
  CreativeImage: StrapiImage;
  UserImage: StrapiImage;
  Socials: StrapiButton[];
  slug: string;
  Slogan?: string;
  SocialShareText?: string;
  CreativeName?: string;
  IsQuote?: boolean;
};
export type Creative = {
  Title: string;
  Description: string;
  Socials: StrapiButton[];
  Button: StrapiButton;
  Creatives: Creatives[];
};

export type ComicPost = {
  id: number;
  attributes: ComicPostData;
};
export type ComicPostData = {
  title: string;
  brief: string;
  slug: string;
  coverImage: StrapiImage;
  Pdf: StrapiImage;
  publishedAt: string;
  id: number;
};
export type ComicHero = {
  title: string;
  Share: string;
  Socials: StrapiButton[];
};
export type RightContentText = {
  Logo: StrapiImage;
  Text: string;
  LogoHref: string;
  isExternal: boolean;
};

export type StrapiVsExtensionHero = {
  Title: string;
  Description: string;
  Image: StrapiImage;
  VideoOrGif: StrapiImage;
  VideoOrGifDark: StrapiImage;
  Buttons: StrapiButton[];
  Capsule: Capsule;
  LeftContentText: string;
  MiddleContentText: string;
  RightContentText: RightContentText[];
  CenterImage_Icon: StrapiImage;
  Description_1: string;
  Description_2: string;
  Description_3: string;
  LottieLG: unknown;
};

export type StrapiPill = {
  id: string;
  Title: string;
  Description: string;
  Image: StrapiImage;
  Link: StrapiButton;
};

export type StrapiPlans = {
  Recommended: boolean;
  Title: string;
  Description: string;
  Price: string;
  Detail: string;
  IncludesTitle: string;
  Button: StrapiButton;
  Bullets: StrapiBullet[];
};

export type MemberType = {
  id: number;
  Name: string;
  Position: string;
  Image: StrapiImage;
};

export type StrapiTeam = {
  id: string;
  Title: string;
  Description: string;
  Image: StrapiImage;
  Members: MemberType[];
};

export type StrapiAdvisor = StrapiTeam;

export type StrapiJoinUs = {
  Title: string;
  Description: string;
  Button: StrapiButton;
};

export type StrapiContact = {
  Title: string;
  Button: StrapiButton;
};

export type StrapiField = {
  id: string;
  Label: string;
  Placeholder: string;
  isRequired: boolean;
  isTextarea: boolean;
  isEmail: boolean;
  isWebsite: boolean;
  SuccessMessage?: string;
};

export type StrapiOption = {
  id: number;
  Label: string;
  Value: string;
};

export type StrapiNumberOfDevelopers = {
  id: string;
  Label: string;
  Placeholder: string;
  isRequired: boolean;
  Options: StrapiOption[];
};

export type StrapiForm = {
  Title: string;
  FirstName: StrapiField;
  LastName: StrapiField;
  CompanyName: StrapiField;
  WorkEmail: StrapiField;
  JobTitle: StrapiField;
  NumberOfDevelopers: StrapiNumberOfDevelopers;
  Button: StrapiButton;
};

export type StrapiFormContactUs = {
  Title: string;
  FirstName: StrapiField;
  LastName: StrapiField;
  CompanyName: StrapiField;
  WorkEmail: StrapiField;
  JobTitle: StrapiField;
  NumberOfDevelopers: StrapiNumberOfDevelopers;
  HowCanWeHelp: StrapiField;
  Button: StrapiButton;
};

export type StrapiFormSupport = {
  Title: string;
  FirstName: StrapiField;
  LastName: StrapiField;
  CompanyName: StrapiField;
  WorkEmail: StrapiField;
  HowCanWeHelp: StrapiField;
  Button: StrapiButton;
};

export type StrapiCheckbox = {
  id: string;
  Label: string;
  isRequired: boolean;
};

export type StrapiFormStartupProgram = {
  id: string;
  Title: string;
  FirstName: StrapiField;
  LastName: StrapiField;
  CompanyWebsite: StrapiField;
  FundingDetails: StrapiField;
  GitOrgName: StrapiField;
  JobTitle: StrapiField;
  Email: StrapiField;
  TrialCheckbox: StrapiCheckbox;
  Button: StrapiButton;
};

export type StrapiSuccess = {
  id: string;
  Title: string;
  Description: string;
  SocialsTitle: string;
  Image: StrapiImage;
  Button: StrapiButton;
  Socials: StrapiButton[];
};

export type StrapiNewsLetter = {
  id: string;
  Title: string;
  Description: string;
  Newsletter: StrapiField;
};

export type StrapiCustomer = {
  Title: string;
  Grayscale: boolean;
  Customers: StrapiButton[];
  CustomersDark: StrapiButton[];
};

export type StrapiCard = {
  id: string;
  Title: string;
  Description: string;
  Icon: StrapiImage;
  Button: StrapiButton[];
};
export type StrapiPromoCard = {
  id: string;
  Title: string;
  Image: StrapiImage;
  Description1: string;
  Description2: string;
  Button: StrapiButton;
};
export type StrapiLeadCard = {
  id: string;
  Title: string;
  Description: string;
  DisplayMode: string;
  Button: StrapiButton;
  Newsletter: StrapiField;
};
export interface BannerData {
  Title: string;
  Description: string;
  Button: StrapiButton;
  email: StrapiField;
  name?: StrapiField;
  Hyperlink?: HyperlinkProps;
  Image: StrapiImage;
  ImagePositionLeft?: boolean;
  widgetNameFromHashnode?: string;
}
export interface BannerProps {
  data: BannerData;
  className?: string;
}
export type SliderType = { id: number; Title: string; Category: string };

// case study props
export type CaseHomeProps = {
  ClientName: string;
  ClientLogo: StrapiImage;
  ClientLogoDark: StrapiImage;
  CaseTitle: string;
  CaseDescription: string;
  Image: StrapiImage;
};
export type CaseStudyFeatureProps = {
  Icon: StrapiImage;
  Description: string;
  id: string;
};
export type CasePointerProps = {
  Heading: string;
  Description: string;
  id: string;
};
export type CaseSummaryProps = {
  Name: string;
  Logo: StrapiImage;
  LogoDark: StrapiImage;
  Location: string;
  WebAddress: string;
  Pointers: CasePointerProps[];
  Button: StrapiButton;
};

export type TestimonialSectionProps = {
  SectionName: string;
  Title: string;
  Description: string;
  Testimonial: string;
  Image: StrapiImage;
  NameAndPosition: string;
};

export type StatsSectionProps = {
  Stats: StatsProps[];
  Brief: string;
};
export type StatsProps = {
  Number: string;
  Description: string;
  id: string;
};
export type CaseBulletsProps = {
  SectionName: string;
  Title: string;
  Description: string;
  Bullets: StrapiBullet[];
  Paragraph: string;
};
export type ConclusionProps = {
  Title: string;
  Bullets: StrapiBullet[];
  id: string;
};
export type CaseConclusionProps = {
  SectionName: string;
  Title: string;
  Description: string;
  Conclusion: ConclusionProps[];
};
export type CaseBodyProps = {
  SectionName: string;
  Title: string;
  SubHeading: string;
  Description: string;
};
export type CaseStudySectionProps = {
  id: string;
  __component: string;
  [key: string]: any;
};

export type CaseLayoutProps = {
  caseSummary: CaseSummaryProps;
  sections: CaseStudySectionProps[];
  metadata: {
    socials: StrapiButton[];
    title: string;
    slug: string;
  };
};
export interface NewsletterField {
  Title: string;
  Description: string;
  name: StrapiField;
  email: StrapiField;
  Button: StrapiButton;
  Hyperlink: HyperlinkProps;
}
