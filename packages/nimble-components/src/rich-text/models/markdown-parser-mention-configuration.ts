import type { MappingConfigs } from '../../rich-text-mention/base/types';
import type { MentionInternals } from '../../rich-text-mention/base/models/mention-internals';

/**
 * A configuration object for a Markdown parser, to be used by the viewer and editor components.
 * This object maintains the necessary internal values for handling mentions within the Markdown parser.
 */
export class MarkdownParserMentionConfiguration {
    public readonly viewElement: string;

    private readonly regexPattern: RegExp;
    private readonly mappingConfigs?: MappingConfigs;

    public constructor(mentionInternals: MentionInternals) {
        this.regexPattern = new RegExp(mentionInternals.pattern ?? '');
        this.mappingConfigs = mentionInternals.mappingConfigs;
        this.viewElement = mentionInternals.viewElement;
    }

    public static isObservedMentionInternalsProperty(arg: unknown): boolean {
        return (
            typeof arg === 'string'
            && ['pattern', 'mappingConfigs'].includes(arg)
        );
    }

    public isValidMentionHref(mentionHref: string): boolean {
        return this.regexPattern.test(mentionHref);
    }

    public getDisplayName(mentionHref: string): string | undefined {
        const mentionMapping = this.mappingConfigs?.get(mentionHref);
        const mentionId = this.extractMentionId(mentionHref);
        return mentionMapping?.displayName ?? mentionId;
    }

    private extractMentionId(mentionHref: string): string | undefined {
        const regexpArray = this.regexPattern.exec(mentionHref);

        // Matches and gets the first group specified in the regex pattern
        // that renders as an alternative to the display name if missing.
        return regexpArray?.[1] ?? undefined;
    }
}
