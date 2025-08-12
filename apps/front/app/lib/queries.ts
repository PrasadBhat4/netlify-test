import qs from 'qs';
import { PagePathType } from './types';

export const meta = qs.stringify({
  populate: {
    seo: {
      populate: '*',
    },
    Seo: {
      populate: '*',
    },
  },
});

export const header = qs.stringify(
  {
    populate: {
      Navigation: {
        populate: {
          Link: true,
          Submenu: true,
        },
      },
      Login: true,
      Button: true,
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const footer = qs.stringify(
  {
    populate: {
      Navigation: {
        populate: {
          Links: true,
        },
      },
      Newsletter: {
        fields: ['Label', 'Placeholder', 'isEmail', 'isRequired'],
      },
      Socials: {
        populate: {
          Socials: true,
        },
      },
      Terms: true,
      Privacy: true,
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const home = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          LottieLG: true,
          LottieSM: true,
          Buttons: {
            populate: {
              Hyperlink: true,
            },
          },
          Capsule: true,
        },
      },
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              Bullets: true,
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      HowItWorks: {
        populate: {
          Steps: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Bullets: true,
              Cta: true,
            },
          },
        },
      },
      Trust: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      GetStarted: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Testimonials: {
        populate: {
          Testimonials: {
            populate: {
              fields: ['Name', 'Avatar', 'Job', 'Opinion'],
              Avatar: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
      Announcment: {
        fields: ['Text', 'isClosable'],
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const home2 = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          LottieLG: true,
          LottieSM: true,
          Buttons: true,
        },
      },
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              Bullets: true,
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      HowItWorks: {
        populate: {
          Steps: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Bullets: true,
            },
          },
        },
      },
      Trust: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      GetStarted: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Testimonials: {
        populate: {
          Testimonials: {
            populate: {
              fields: ['Name', 'Avatar', 'Job', 'Opinion'],
              Avatar: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const homepageCollection = qs.stringify(
  {
    populate: {
      seo: {
        populate: {
          og_image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          twitter_image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          LottieLG: true,
          LottieSM: true,
          Buttons: {
            populate: {
              Hyperlink: true,
            },
          },
          Capsule: true,
        },
      },
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              Bullets: true,
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      Trust: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      GetStarted: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Testimonials: {
        populate: {
          Testimonials: {
            populate: {
              fields: ['Name', 'Avatar', 'Job', 'Opinion'],
              Avatar: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      HowItWorks: {
        populate: {
          Steps: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Bullets: true,
              Cta: true,
            },
          },
        },
      },
      Announcment: {
        fields: ['Text', 'isClosable'],
        populate: {
          Button: true,
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const vsCodeExtension = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGif: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGifDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          CenterImage_Icon: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          RightContentText: {
            populate: {
              Logo: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Buttons: true,
          Capsule: true,
        },

        fields: [
          'Title',
          'Description',
          'LeftContentText',
          'MiddleContentText',
          'Description_1',
          'Description_2',
          'Description_3',
        ],
      },
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              Bullets: true,
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      BenefitsLayout: {
        populate: {
          Benefits: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      Architecture: {
        fields: ['Title'],
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDarkSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      HowItWorks: {
        populate: {
          Steps: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Bullets: true,
              Cta: true,
            },
          },
        },
      },
      Trust: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      OpenSourceProject: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Plans: {
        populate: {
          Plans: {
            populate: {
              Button: true,
              Bullets: true,
            },
          },
        },
      },
      Faqs: {
        populate: {
          Faqs: true,
          Button: true,
        },
      },
      GetStarted: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    fields: ['SectionTitle'],
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);
export const trustCenter = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Pills: {
        populate: {
          Pills: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Link: true,
            },
          },
        },
      },
      Security: {
        populate: {
          Securities: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
        },
      },
      SecureDevelopment: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      PrivacyPolicy: {
        populate: {
          Questions: {
            populate: {
              Bullets: true,
            },
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const contact = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Bullets: true,
        },
      },
      Form: {
        populate: {
          FirstName: true,
          LastName: true,
          CompanyName: true,
          WorkEmail: true,
          JobTitle: true,
          NumberOfDevelopers: {
            populate: {
              Options: true,
            },
          },
          HowCanWeHelp: true,
          Button: true,
        },
      },
      Success: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
          Socials: {
            populate: {
              Image: true,
            },
          },
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const support = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Bullets: true,
        },
      },
      Form: {
        populate: {
          FirstName: true,
          LastName: true,
          CompanyName: true,
          WorkEmail: true,
          HowCanWeHelp: true,
          Button: true,
        },
      },
      Success: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
          Socials: {
            populate: {
              Image: true,
            },
          },
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const pricing = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Plans: {
        populate: {
          Plans: {
            populate: {
              Button: true,
              Bullets: true,
            },
          },
        },
      },
      OpenSourceProject: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Faqs: {
        populate: {
          Faqs: true,
          Button: true,
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const brandGuideline = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      AssetLayout: {
        populate: {
          AssetCard: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              SvgIcon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              PngIcon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      TitleSection: {
        fields: ['Title', 'Category'],
        populate: '*',
      },
      LogoLayout: {
        fields: ['Title', 'Description', 'isDarkMode'],
        populate: {
          LogoLayoutCard: {
            fields: ['Title', 'Description'],
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Image1: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Image2: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Image3: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      ColorPalette: {
        fields: ['Title', 'Description', 'isDarkMode'],
        populate: {
          AssetCard: {
            fields: ['Title', 'Color', 'ColorName', 'Hex', 'Rgb', 'Cmyk', 'isDarkMode'],
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              SvgIcon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              PngIcon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const customers = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Cases: {
        populate: {
          Cases: {
            populate: {
              CustomerLight: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              CustomerDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              CoverLight: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              CoverDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      Grayscale: true,
      Images: {
        fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
      },
      ImagesDark: {
        fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
      },
      Impact: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Slider: {
            populate: {
              Company: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              CompanyDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Avatar: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
        },
      },
      Testimonials: {
        populate: {
          Testimonials: {
            populate: {
              fields: ['Name', 'Avatar', 'Job', 'Opinion'],
              Avatar: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const startupProgram = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      FormSideSection: {
        populate: {
          Bullets: true,
        },
      },
      Form: {
        populate: {
          FirstName: true,
          LastName: true,
          CompanyWebsite: true,
          FundingDetails: true,
          GitOrgName: true,
          JobTitle: true,
          Email: true,
          TrialCheckbox: true,
          Button: true,
        },
      },
      Success: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
          Socials: {
            populate: {
              Image: true,
            },
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const ghEventPage = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      EventCard: {
        populate: {
          Title: true,
          Description: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      CalendarTitle: true,
      EventIframeTitle: true,
      CalendarDescription: true,
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const trustCenterSOC = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      FormSideSection: {
        populate: {
          Bullets: true,
        },
      },
      Form: {
        populate: {
          FirstName: true,
          LastName: true,
          CompanyName: true,
          WorkEmail: true,
          JobTitle: true,
          NumberOfDevelopers: {
            populate: {
              Options: true,
            },
          },
          Button: true,
        },
      },
      Success: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
          Socials: {
            populate: {
              Image: true,
            },
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const trustCenterGDPR = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      FormSideSection: {
        populate: {
          Bullets: true,
        },
      },
      Form: {
        populate: {
          FirstName: true,
          LastName: true,
          CompanyName: true,
          WorkEmail: true,
          JobTitle: true,
          NumberOfDevelopers: {
            populate: {
              Options: true,
            },
          },
          UtmSource: true,
          Button: true,
        },
      },
      Success: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
          Socials: {
            populate: {
              Image: true,
            },
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const whitepaper = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Bullets: true,
        },
      },
      Form: {
        populate: {
          FirstName: true,
          LastName: true,
          CompanyName: true,
          WorkEmail: true,
          JobTitle: true,
          NumberOfDevelopers: {
            populate: {
              Options: true,
            },
          },
          Button: true,
        },
      },
      Success: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
          Socials: {
            populate: {
              Image: true,
            },
          },
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const partnership = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Bullets: true,
        },
      },
      Form: {
        populate: {
          FirstName: true,
          LastName: true,
          CompanyName: true,
          WorkEmail: true,
          JobTitle: true,
          NumberOfDevelopers: {
            populate: {
              Options: true,
            },
          },
          Button: true,
        },
      },
      Success: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
          Socials: {
            populate: {
              Image: true,
            },
          },
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const eventsCollection = qs.stringify(
  {
    populate: {
      Title: true,
      Slug: true,
      Sections: {
        on: {
          'layout.custom-features-section': {
            populate: {
              Features: {
                populate: {
                  CustomLayout: true,
                  Bullets: true,
                  ImageXL: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageLG: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageMD: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageSM: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
              Button: true,
            },
          },
          'layout.hero': {
            populate: {
              Buttons: true,
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'layout.contact-us-section': {
            populate: {
              Button: true,
            },
          },
          'layout.get-started': {
            fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
            populate: {
              Buttons: true,
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'layout.alternated-content': {
            populate: {
              ContentWithImages: {
                populate: {
                  Image: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageDark: true,
                  Button: true,
                },
              },
            },
          },
          'layout.how-it-works-section': {
            populate: {
              Steps: {
                populate: {
                  Image: true,
                  Bullets: true,
                },
              },
            },
          },
          'layout.trust-section': {
            populate: {
              Cards: {
                populate: {
                  Icon: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
            },
          },
          'layout.privacy-policy-section': {
            populate: {
              Questions: {
                populate: {
                  Bullets: true,
                },
              },
            },
          },
          'layout.markdown-card-section': {
            populate: {
              Body: true,
            },
          },
          'layout.simple-hero': {
            populate: {
              Buttons: true,
              CarouselWithTooltips: true,
              CarouselWithTooltipsDark: true,
            },
          },
          'layout.hs-embeded-calendar': {
            populate: {
              Title: true,
              Description: true,
              SourceUrl: true,
            },
          },
          'layout.metrics-section': {
            populate: {
              Stats: {
                fields: ['Number', 'Description'],
              },
            },
          },
          'layout.plans-section': {
            populate: {
              Plans: {
                populate: {
                  Button: true,
                  Bullets: true,
                },
              },
            },
          },
          'layout.testimonials': {
            populate: {
              Testimonials: {
                populate: {
                  fields: ['Name', 'Avatar', 'Job', 'Opinion'],
                  Avatar: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
              Button: true,
            },
          },
          'layout.customers-section': {
            populate: {
              Customers: {
                populate: {
                  Image: true,
                },
              },
              CustomersDark: {
                populate: {
                  Image: true,
                },
              },
            },
          },
          'layout.collapsible-boxes-section': {
            populate: {
              Title: true,
              Features: {
                populate: {
                  Title: true,
                  Description: true,
                  ImageXL: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageLG: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageMD: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageSM: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
            },
          },
          'layout.hero-cards-section': {
            populate: {
              Cards: {
                populate: {
                  Icon: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  Button: true,
                  Title: true,
                  Description: true,
                },
              },
            },
          },
          'layout.enterprise-hero-with-video': {
            populate: {
              Buttons: true,
              Title: true,
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export const faq = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Faqs: {
        populate: {
          Faqs: true,
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const enterprise = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Buttons: true,
        },
      },
      HeroCards: {
        populate: {
          Icon: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      Security: {
        populate: {
          Securities: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
        },
      },
      Platform: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSMDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      GetStarted: {
        fields: ['Title'],
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      SecureDevelopment: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      Impact: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Slider: {
            populate: {
              Company: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              CompanyDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Avatar: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
        },
      },
      Plans: {
        populate: {
          Plans: {
            populate: {
              Button: true,
              Bullets: true,
            },
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const helpDesk = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Buttons: true,
        },
      },
      Cards: {
        populate: {
          Icon: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const aboutUs = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          BackedByImages: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          BackedByImagesDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Team: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Members: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Advisors: {
        populate: {
          Members: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      JoinUs: {
        populate: {
          Button: true,
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const blog = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Sliders: {
        populate: {
          Slider: {
            fields: ['Title', 'Category', 'Subtitle'],
          },
        },
      },
      Seo: {
        populate: '*',
      },
      Newsletter: {
        populate: {
          Newsletter: {
            fields: ['Label', 'Placeholder', 'isEmail'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const blogInternal = qs.stringify(
  {
    populate: {
      Socials: {
        populate: {
          Socials: true,
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
      PromoCard: {
        populate: {
          Button: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      BlogBanners: {
        populate: {
          Button: true,
          email: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      LeadCard: {
        populate: {
          Email: {
            populate: {
              Newsletter: {
                fields: ['Label', 'Placeholder', 'isEmail'],
              },
            },
          },
          Button: {
            populate: {
              Button: true,
            },
          },
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const termsOfService = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const privacyPolicy = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const hoppyCorner = qs.stringify(
  {
    populate: {
      Sections: {
        on: {
          'components.hoppy-hero': {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'components.hoppy-banner': {
            populate: {
              Buttons: true,
              email: true,
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'layout.hoppy-mood': {
            populate: {
              Button: true,
              Versions: {
                populate: {
                  Icon: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  Button: true,
                  Image: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
              Socials: true,
            },
          },
          'layout.hoppy-comic-section': {
            populate: {
              Button: true,
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'layout.hoppy-fan-creatives': {
            populate: {
              Button: true,
              Socials: {
                populate: {
                  Socials: true,
                },
              },
              // Creatives: {
              //   populate: {
              //     CreativeImage: {
              //       fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              //     },
              //     UserImage: {
              //       fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              //     },
              //   },
              // },
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export const comicsCollection = qs.stringify(
  {
    populate: {
      coverImage: {
        populate: '*',
      },
      Pdf: {
        populate: '*',
      },
      Socials: {
        populate: {
          Socials: true,
        },
      },
      Banner: {
        populate: {
          Buttons: true,
          email: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const comicsLandingPage = qs.stringify(
  {
    populate: {
      ComicPageTitle: true,
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);
export const hoppyversionsCollection = qs.stringify(
  {
    populate: {
      CreativeImage: {
        fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
      },
      UserImage: {
        fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);
export const solutionsCollection = qs.stringify(
  {
    populate: {
      Title: true,
      Slug: true,
      Sections: {
        on: {
          'layout.custom-features-section': {
            populate: {
              Features: {
                populate: {
                  CustomLayout: true,
                  Bullets: true,
                  ImageXL: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageLG: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageMD: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageSM: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
              Button: true,
            },
          },
          'layout.hero': {
            populate: {
              Buttons: true,
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'layout.contact-us-section': {
            populate: {
              Button: true,
            },
          },
          'layout.get-started': {
            fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
            populate: {
              Buttons: true,
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'layout.alternated-content': {
            populate: {
              ContentWithImages: {
                populate: {
                  Image: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageDark: true,
                  Button: true,
                },
              },
            },
          },
          'layout.how-it-works-section': {
            populate: {
              Steps: {
                populate: {
                  Bullets: true,
                  Image: true,
                },
              },
            },
          },
          'layout.trust-section': {
            populate: {
              Cards: {
                populate: {
                  Icon: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
            },
          },
          'layout.privacy-policy-section': {
            populate: {
              Questions: {
                populate: {
                  Bullets: true,
                },
              },
            },
          },
          'layout.markdown-card-section': {
            populate: {
              Body: true,
            },
          },
          'layout.simple-hero': {
            populate: {
              Buttons: true,
              CarouselWithTooltips: {
                populate: {
                  Image: true,
                },
              },
              CarouselWithTooltipsDark: {
                populate: {
                  Image: true,
                },
              },
            },
          },
          'layout.hs-embeded-calendar': {
            populate: {
              Title: true,
              Description: true,
              SourceUrl: true,
            },
          },
          'layout.metrics-section': {
            populate: {
              Stats: {
                fields: ['Number', 'Description'],
              },
            },
          },
          'layout.plans-section': {
            populate: {
              Plans: {
                populate: {
                  Button: true,
                  Bullets: true,
                },
              },
            },
          },
          'layout.testimonials': {
            populate: {
              Testimonials: {
                populate: {
                  fields: ['Name', 'Avatar', 'Job', 'Opinion'],
                  Avatar: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
              Button: true,
            },
          },
          'layout.customers-section': {
            populate: {
              Customers: {
                populate: {
                  Image: true,
                },
              },
              CustomersDark: {
                populate: {
                  Image: true,
                },
              },
            },
          },
          'layout.collapsible-boxes-section': {
            populate: {
              Title: true,
              Features: {
                populate: {
                  Title: true,
                  Description: true,
                  ImageXL: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageLG: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageMD: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  ImageSM: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                },
              },
            },
          },
          'layout.hero-cards-section': {
            populate: {
              Cards: {
                populate: {
                  Icon: {
                    fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
                  },
                  Button: true,
                  Title: true,
                  Description: true,
                },
              },
            },
          },
          'layout.enterprise-hero-with-video': {
            populate: {
              Buttons: true,
              Title: true,
            },
          },
          'layout.feature-grid-section': {
            populate: {
              Title: true,
              Features: {
                populate: '*',
              },
              Button: true,
            },
          },
          'layout.faq': {
            populate: {
              Title: true,
              Description: true,
              Faqs: {
                populate: {
                  Question: true,
                  Answer: true,
                  Category: true,
                },
              },
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export const idesCollection = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGif: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGifDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          CenterImage_Icon: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          RightContentText: {
            populate: {
              Logo: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Buttons: {
            populate: {
              Hyperlink: true,
            },
          },
          Capsule: true,
        },
      },
      Variant: true,
      Slug: true,
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              Bullets: true,
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      BenefitsLayout: {
        populate: {
          Benefits: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      Architecture: {
        fields: ['Title'],
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDarkSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      HowItWorks: {
        populate: {
          Steps: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Bullets: true,
              Cta: true,
            },
          },
        },
      },
      Trust: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      OpenSourceProject: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Plans: {
        populate: {
          Plans: {
            populate: {
              Button: true,
              Bullets: true,
            },
          },
        },
      },
      Faqs: {
        populate: {
          Faqs: true,
          Button: true,
        },
      },
      GetStarted: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export const cursor = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGif: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGifDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          CenterImage_Icon: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          RightContentText: {
            populate: {
              Logo: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Buttons: {
            populate: {
              Hyperlink: true,
            },
          },
          Capsule: true,
        },
      },
      Variant: true,
      Slug: true,
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              Bullets: true,
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      BenefitsLayout: {
        populate: {
          Benefits: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      Architecture: {
        fields: ['Title'],
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDarkSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      HowItWorks: {
        populate: {
          Steps: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Bullets: true,
              Cta: true,
            },
          },
        },
      },
      Trust: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      OpenSourceProject: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Plans: {
        populate: {
          Plans: {
            populate: {
              Button: true,
              Bullets: true,
            },
          },
        },
      },
      Faqs: {
        populate: {
          Faqs: true,
          Button: true,
        },
      },
      GetStarted: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export const windsurf = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGif: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGifDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          CenterImage_Icon: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          RightContentText: {
            populate: {
              Logo: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Buttons: {
            populate: {
              Hyperlink: true,
            },
          },
          Capsule: true,
        },
      },
      Variant: true,
      Slug: true,
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              Bullets: true,
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      BenefitsLayout: {
        populate: {
          Benefits: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      Architecture: {
        fields: ['Title'],
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDarkSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      HowItWorks: {
        populate: {
          Steps: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Bullets: true,
              Cta: true,
            },
          },
        },
      },
      Trust: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      OpenSourceProject: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Plans: {
        populate: {
          Plans: {
            populate: {
              Button: true,
              Bullets: true,
            },
          },
        },
      },
      Faqs: {
        populate: {
          Faqs: true,
          Button: true,
        },
      },
      GetStarted: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export const visualStudioCode = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGif: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          VideoOrGifDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          CenterImage_Icon: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          RightContentText: {
            populate: {
              Logo: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Buttons: {
            populate: {
              Hyperlink: true,
            },
          },
          Capsule: true,
        },
      },
      Variant: true,
      Slug: true,
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      Features: {
        populate: {
          Features: {
            populate: {
              Bullets: true,
              ImageXL: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageLG: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageMD: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageSM: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      BenefitsLayout: {
        populate: {
          Benefits: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              ImageDark: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Button: true,
            },
          },
          Button: true,
        },
      },
      Architecture: {
        fields: ['Title'],
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageDarkSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      HowItWorks: {
        populate: {
          Steps: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Bullets: true,
              Cta: true,
            },
          },
        },
      },
      Trust: {
        populate: {
          Cards: {
            populate: {
              Icon: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          Button: true,
        },
      },
      OpenSourceProject: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Plans: {
        populate: {
          Plans: {
            populate: {
              Button: true,
              Bullets: true,
            },
          },
        },
      },
      Faqs: {
        populate: {
          Faqs: true,
          Button: true,
        },
      },
      GetStarted: {
        fields: ['Title', 'Description_1', 'Description_2', 'TextDetails'],
        populate: {
          Buttons: true,
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export const vdp = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);
export const dpa = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);
export const caseStudy = qs.stringify(
  {
    populate: {
      Sliders: {
        populate: {
          Slider: {
            fields: ['Title', 'Category'],
          },
        },
      },
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      categories: {
        populate: {
          fields: ['categoryName', 'Description'],
        },
      },
      ContactBanner: {
        populate: {
          name: {
            fields: ['Label', 'Placeholder', 'isEmail'],
          },
          email: {
            fields: ['Label', 'Placeholder', 'isEmail'],
          },
          Button: {
            populate: {
              Hyperlink: {
                fields: ['Text', 'HyperlinkText', 'HyperlinkUrl'],
              },
            },
          },
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);
export const casesCollection = qs.stringify(
  {
    populate: {
      category: {
        fields: ['name', 'slug'],
      },
      CaseHome: {
        populate: {
          ClientLogo: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ClientLogoDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          ImageSM: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      CaseSummary: {
        populate: {
          Logo: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          LogoDark: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Pointers: true,
          Button: true,
        },
      },
      Features: {
        populate: {
          Icon: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Socials: true,
      ContactBanner: {
        populate: {
          name: true,
          Button: {
            populate: {
              Hyperlink: {
                fields: ['Text', 'HyperlinkText', 'HyperlinkUrl'],
              },
            },
          },
          email: true,
        },
      },
      Sections: {
        on: {
          'casestudy.stats': {
            populate: {
              Stats: {
                populate: {
                  fields: ['Number', 'Description'],
                },
              },
              Brief: true,
            },
          },
          'casestudy.conclusion': {
            populate: {
              Conclusion: {
                populate: {
                  fields: ['Title'],
                  Bullets: true,
                },
              },
            },
          },
          'casestudy.section-1': {
            populate: {
              Title: true,
              Description: true,
              Testimonial: true,
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'casestudy.section-2': {
            populate: {
              fields: ['SectionName', 'Description', 'Testimonial', 'Paragraph'],
              Bullets: true,
            },
          },
          'casestudy.section-3': {
            populate: {
              fields: ['SectionName', 'SubHeading', 'Title', 'Description'],
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
          'casestudy.section-4': {
            populate: {
              fields: ['Description'],
            },
          },
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);
export const studentProgram = qs.stringify(
  {
    populate: {
      Hero: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
        },
      },
      Stats: {
        populate: {
          Stats: {
            fields: ['Number', 'Description'],
          },
        },
      },
      Customers: {
        populate: {
          Customers: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
              Grayscale: true,
            },
          },
          CustomersDark: {
            populate: {
              Image: {
                fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
              },
            },
          },
        },
      },
      FormSideSection: {
        populate: {
          Bullets: true,
        },
      },
      Form: {
        populate: {
          FirstName: true,
          LastName: true,
          CompanyWebsite: true,
          FundingDetails: true,
          GitOrgName: true,
          JobTitle: true,
          Email: true,
          TrialCheckbox: true,
          Button: true,
        },
      },
      Success: {
        populate: {
          Image: {
            fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
          },
          Button: true,
          Socials: {
            populate: {
              Image: true,
            },
          },
        },
      },
      Contact: {
        populate: {
          Button: true,
        },
      },
    },
    publicationState: 'live',
  },
  {
    encodeValuesOnly: true,
  }
);

export const getPageQuery: Record<PagePathType | string, string> = {
  header,
  'home-page': home,
  'home-page-2': home2,
  'trust-center': trustCenter,
  'trust-center-soc': trustCenterSOC,
  'trust-center-gdpr': trustCenterGDPR,
  pricing,
  customer: customers,
  'startup-program': startupProgram,
  contact,
  support,
  whitepaper,
  partnership,
  faq,
  footer,
  meta,
  solutionsCollection,
  'gh-event-page': ghEventPage,
  enterprise,
  'help-desk': helpDesk,
  'about-us': aboutUs,
  eventsCollection,
  blog,
  'blog-internal': blogInternal,
  'terms-of-service': termsOfService,
  'privacy-policy': privacyPolicy,
  'brand-guideline': brandGuideline,
  'vs-code-extension': vsCodeExtension,
  idesCollection,
  'hoppy-corner': hoppyCorner,
  'comics-landing': comicsLandingPage,
  comicsCollection,
  hoppyversionsCollection,
  vdp,
  cursor,
  windsurf,
  'visual-studio-code': visualStudioCode,
  dpa,
  homepagesCollection: homepageCollection,
  'case-study': caseStudy,
  cases: casesCollection,
  casesCollection,
  'student-program': studentProgram,
};
