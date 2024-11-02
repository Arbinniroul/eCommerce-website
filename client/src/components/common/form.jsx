import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Button} from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export const types = {
  INPUT: 'input',
  SELECT: 'select',
  TEXTAREA: 'textarea'
};

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
  function rendersInputByComponentType(controlItem) {
    const value = formData[controlItem.name] || '';
    let element;

    switch (controlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={event => setFormData({ ...formData, [controlItem.name]: event.target.value })}
            className="input-class " // Optional custom class
          />
        );
        break;

      case types.SELECT:
        element = (
          <Select
            onValueChange={value => setFormData({ ...formData, [controlItem.name]: value })}
            name={controlItem.name}
            id={controlItem.name}
            value={value}
            className="select-class" // Optional custom class
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options.map(option => (
                <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      case types.TEXTAREA:
        element = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={event => setFormData({ ...formData, [controlItem.name]: event.target.value })}
            className="textarea-class" // Optional custom class
          />
        );
        break;

      default:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={event => setFormData({ ...formData, [controlItem.name]: event.target.value })}
            className="input-class" // Optional custom class
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {formControls.map(controlItem => (
        <div className="grid w-full gap-1.5" key={controlItem.name}>
          <Label className="mb-1">{controlItem.label}</Label>
          {rendersInputByComponentType(controlItem)}
        </div>
      ))}
      <Button type="submit" className="mt-2 w-full bg-black text-white" variant="outline">{buttonText || 'Submit'}</Button>
    </form>
  );
}

export default CommonForm;
