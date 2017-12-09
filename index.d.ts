export as namespace places;

export = places;

declare const places: places.PlacesStatic;

declare namespace places {
    type PlaceType = 'city' | 'country' | 'address' | 'busStop' | 'trainStation' | 'townhall' | 'airport';

    type RawAnswer = any;

    // EVENTS BEGIN

    interface ChangeEvent {
        query: string;
        rawAnswer: RawAnswer;
        suggestion: Suggestion;
        suggestionIndex: number;
    }

    interface SuggestionsEvent {
        rawAnswer: RawAnswer;
        query: string;
        suggestions: Array<Suggestion>;
    }

    interface CursorChangedEvent {
        rawAnswer: RawAnswer;
        query: string;
        suggestion: Suggestion;
        suggestionIndex: number;
    }

    type ClearEvent = undefined;

    interface LimitEvent {
        message: string;
    }

    interface ErrorEvent {
        message: string;
    }

    // EVENTS END

    interface Suggestion {
        type: PlaceType;
        name: string;
        city: string;
        country: string;
        countryCode: string;
        administrative: string; // administrative region
        latlng: {
            lat: number;
            lng: number;
        };
        postcode: string;
        value: string; // full display name of the place found
        highlight: {
            name: string;
            administrative: string; // administrative region
            city: string;
            country: string;
        }
    }

    interface PlacesTemplates {
        value?: (suggestion: Suggestion) => string;
        suggestion?: (suggestion: Suggestion) => string;
    }

    interface PlacesOptions {
        container: HTMLInputElement;
        type?: PlaceType;
        language?: string;
        countries?: Array<string>;
        aroundLatLng?: string;
        aroundLatLngViaIP?: boolean;
        aroundRadius?: number;
        templates?: PlacesTemplates;
        style?: boolean;
        appId?: string;
        apiKey?: string;
        useDeviceLocation?: boolean;
        computeQueryParams?: {};
        clientOptions?: {};
        autocompleteOptions?: {};
        insideBoundingBox?: string;
        insidePolygon?: string;
    }

    interface PlacesAutocomplete {
        on(eventType: 'change', eventHandler: (event: ChangeEvent) => void): void;
        on(eventType: 'suggestions', eventHandler: (event: SuggestionsEvent) => void): void;
        on(eventType: 'cursorChanged', eventHandler: (event: CursorChangedEvent) => void): void;
        on(eventType: 'clear', eventHandler: (event: ClearEvent) => void): void;
        on(eventType: 'limit', eventHandler: (event: LimitEvent) => void): void;
        on(eventType: 'error', eventHandler: (event: ErrorEvent) => void): void;

        open(): undefined;
        close(): undefined;
        getVal(): string;
        setVal(value: string): undefined;
        destroy(): undefined;
    }

    interface PlacesStatic {
        (options: PlacesOptions): PlacesAutocomplete;
    }
}
