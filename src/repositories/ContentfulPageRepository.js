/* eslint-disable no-console */
/* eslint-disable max-len */
import * as contentful from 'contentful';
import AccordionModule from '../models/contentful/AccordionModule';
import BadgesModule from '../models/contentful/BadgesModule';
import ButtonModule from '../models/contentful/ButtonModule';
import ContactModule from '../models/contentful/ContactModule';
import CookieConsentTool from '../models/contentful/CookieConsentTool';
import Cover from '../models/contentful/Cover';
import Footer from '../models/contentful/Footer';
import FourColumnsModule from '../models/contentful/FourColumnsModule';
import Header from '../models/contentful/Header';
import InstagramModule from '../models/contentful/InstagramModule';
import MediaModule from '../models/contentful/MediaModule';
import Metadata from '../models/contentful/Metadata';
import QuoteModule from '../models/contentful/QuoteModule';
import ScriptModule from '../models/contentful/ScriptModule';
import Shop from '../models/contentful/Shop';
import TableModule from '../models/contentful/TableModule';
import Team from '../models/contentful/Team';
import TeaserModule from '../models/contentful/TeaserModule';
import TextModule from '../models/contentful/TextModule';
import ThreeColumnsModule from '../models/contentful/ThreeColumnsModule';
import TwoColumnsModule from '../models/contentful/TwoColumnsModule';


export default class ContentfulPageRepository {
    constructor(cache, {
        space,
        accessToken,
        preview
    }) {
        this.cache = cache;
        this.client = contentful.createClient({
            space,
            accessToken,
            host: preview ? 'preview.contentful.com' : 'cdn.contentful.com'
        });
    }

    async getHeader() {
        try {
            const cached = this.cache.get('header');
            if (cached) {
                return cached;
            }
            const entries = await this.client.getEntries({
                content_type: 'header',
                include: 1,
            });
            const header = new Header(entries.items[0]);
            this.cache.set(header, 'header');
            return header;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getFooter() {
        try {
            const cached = this.cache.get('footer');
            if (cached) {
                return cached;
            }
            const entries = await this.client.getEntries({
                content_type: 'footer',
                include: 1,
            });
            const footer = new Footer(entries.items[0]);
            this.cache.set(footer, 'footer');
            return footer;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getCookieConsent() {
        try {
            const cached = this.cache.get('cookieConsent');
            if (cached) {
                return cached;
            }
            const entries = await this.client.getEntries({
                content_type: 'cookieConsentTool',
                include: 1,
            });
            const cookieConsent = new CookieConsentTool(entries.items[0]);
            this.cache.set(cookieConsent, 'cookieConsent');
            return cookieConsent;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getMetadata(path) {
        try {
            const cached = this.cache.get(`metadata-${path}`);
            if (cached) {
                return cached;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getContent(path) {
        try {
            const cachedPage = this.cache.get(path);
            if (cachedPage) {
                return cachedPage;
            }

            if (!path) {
                const header = await this.getHeader();
                const newPath = header.menu[0].fields.path;
                return this.getContent(newPath || '404');
            }

            const entries = await this.client.getEntries({
                content_type: 'content',
                'fields.path': path,
                include: 3,
            });

            if (entries && entries.items && entries.items[0]) {
                const { items } = entries;
                if (items && items[0].fields) {
                    const metadata = new Metadata(items[0]);
                    this.cache.set(metadata, `metadata-${path}`);
                }
                if (items && items[0].fields && items[0].fields.modules) {
                    const content = await this.convertToModel(items[0].fields.modules);
                    const filteredContent = content.filter(c => c);
                    this.cache.set(filteredContent, path);
                    return filteredContent;
                }
            }
            return [];
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async convertToModel(modules) {
        return Promise.all(modules.map(async (entry) => {
            if (entry.sys.contentType) {
                switch (entry.sys.contentType.sys.id) {
                    case 'accordionModule':
                        return new AccordionModule(entry);
                    case 'badgeModule': {
                        return new BadgesModule(entry);
                    }
                    case 'content':
                        return new TeaserModule(entry);
                    case 'cover':
                        return new Cover(entry);
                    case 'fancyExtension':
                        if (!entry.fields || !entry.fields.extension) {
                            break;
                        }
                        switch (entry.fields.extension.module) {
                            case 'Contact':
                                return new ContactModule(entry);
                            case 'Instagram':
                                return new InstagramModule(entry);
                            case 'Script':
                                return new ScriptModule(entry);
                            default:
                                break;
                        }
                        break;
                    case 'shop':
                        return new Shop(entry);
                    case 'quoteModule': {
                        return new QuoteModule(entry);
                    }
                    case 'tableModule':
                        return new TableModule(entry);
                    case 'twoColumnsModule':
                    {
                        const left = entry.fields.left ? await this.convertToModel(entry.fields.left) : null;
                        const right = entry.fields.right ? await this.convertToModel(entry.fields.right) : null;
                        return new TwoColumnsModule(entry, {
                            left, right
                        }); }
                    case 'threeColumnsModule':
                    {
                        const left = entry.fields.left ? await this.convertToModel(entry.fields.left) : null;
                        const center = entry.fields.center ? await this.convertToModel(entry.fields.center) : null;
                        const right = entry.fields.right ? await this.convertToModel(entry.fields.right) : null;
                        return new ThreeColumnsModule(entry, {
                            left, center, right
                        }); }
                    case 'fourColumnsModule':
                    {
                        const left = entry.fields.left ? await this.convertToModel(entry.fields.left) : null;
                        const leftCenter = entry.fields.leftCenter ? await this.convertToModel(entry.fields.leftCenter) : null;
                        const rightCenter = entry.fields.rightCenter ? await this.convertToModel(entry.fields.rightCenter) : null;
                        const right = entry.fields.right ? await this.convertToModel(entry.fields.right) : null;
                        return new FourColumnsModule(entry, {
                            left, leftCenter, rightCenter, right
                        }); }
                    case 'mediaModule':
                        return new MediaModule(entry);
                    case 'teamModule': {
                        return new Team(entry);
                    }
                    case 'textModule':
                        return new TextModule(entry);
                    case 'buttonModule':
                        return new ButtonModule(entry);
                    case undefined:
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`Unknown entry type: ${entry.sys.contentType.sys.id}`);
                        return null;
                }
            }
            return null;
        }));
    }
}
