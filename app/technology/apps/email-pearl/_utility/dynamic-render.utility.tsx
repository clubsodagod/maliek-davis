import { render } from '@react-email/render';
import { COMPONENT_MAP } from '../_library/templates.const';

// COMPONENT_MAP is an array now
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderTemplate(componentSource: string, props: Record<string, any>) {
    const match = COMPONENT_MAP.find(t => t.componentSource === componentSource);
    if (!match) throw new Error("Template component not found");

    const Component = match.Component;
    return render(<Component propertyAddress={props.propertyAddress} city={props.city} yourFirstName={props.yourFirstName} yourPhoneNumber={props.yourPhoneNumber} yourEmail={props.yourEmail} {...props} />);
}
