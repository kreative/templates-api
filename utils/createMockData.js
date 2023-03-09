/* eslint-disable @typescript-eslint/no-var-requires */
// creates mock data using the Kreative Templates API

const axios = require('axios');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

class MockDataGenerator {
  constructor(numberOfTemplates = 1) {
    this.numberOfTemplates = numberOfTemplates;
    this.lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 5,
        min: 3,
      },
      wordsPerSentence: {
        max: 7,
        min: 4,
      },
    });
  }

  static TEMPLATES_API_URL = 'https://api.kreativetemplates.co/v1/templates';
  static CATEGORIES = [
    'business',
    'art',
    'health-and-fitness',
    'productivity',
    'school',
  ];

  #postMockTemplate = async (template) => {
    const response = await axios.post(
      MockDataGenerator.TEMPLATES_API_URL,
      template,
      {
        headers: {
          KREATIVE_ID_KEY: process.env.MOCK_KREATIVE_ID_KEY,
          KREATIVE_AIDN: process.env.HOST_AIDN,
          KREATIVE_APPCHAIN: process.env.KREATIVE_APPCHAIN,
        },
      },
    );

    if (response.status === 201) {
      return `CREATED TEMPLATE: ${response.data.data.name}`;
    } else {
      console.log(response);
      throw new Error(response);
    }
  };

  #createTemplateData = () => {
    const categoryName =
      MockDataGenerator.CATEGORIES[
        Math.floor(Math.random() * MockDataGenerator.CATEGORIES.length)
      ];
    const name = this.lorem.generateWords(3);
    const slug = name.replace(/ /g, '-').toLowerCase();
    console.log(slug);
    const tagline = this.lorem.generateSentences(1);
    const description = this.lorem.generateParagraphs(2);

    const templateData = {
      name,
      description,
      tagline,
      slug,
      categoryName,
      application: 'obsidian',
      thumbnailUrl: 'https://cdn.kreativeusa.com/mock-template-thumbnail.png',
      galleryImages: [
        'https://cdn.kreativeusa.com/mock-template-thumbnail.png',
        'https://cdn.kreativeusa.com/mock-template-thumbnail.png',
        'https://cdn.kreativeusa.com/mock-template-thumbnail.png',
      ],
      price: 0,
      fileUrl: 'https://cdn.kreativeusa.com/mock-template-thumbnail.png',
      downloadUrl: 'https://cdn.kreativeusa.com/mock-template-thumbnail.png',
      authorId: '30203afe-c324-46b2-851d-870b0a6921da',
      plugins: ['Plugin1', 'Plugin2', 'Cool Plugin 3'],
    };

    return templateData;
  };

  generate() {
    for (let i = 0; i < this.numberOfTemplates; i++) {
      const templateData = this.#createTemplateData();
      this.#postMockTemplate(templateData);
    }
  }
}

const mockDataGenerator = new MockDataGenerator(7);

mockDataGenerator.generate();
