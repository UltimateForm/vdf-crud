import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { Field, FieldRenderProps, Form } from "react-final-form";
import { IDevice } from "types";
// import classNames from "classnames";

function TextInputField(
	props: FieldRenderProps<any, HTMLElement, any> & { label: string }
) {
	const { input, meta, label } = props;
	return (
		<div className="grid gap-1">
			<label
				className={classNames(
					"text-xs font-medium transition-opacity ease-in-out",
					input.value ? "opacity-100" : "opacity-0"
				)}
			>
				{label}
			</label>
			<input
				type="text"
				{...input}
				placeholder={label}
				className="input input-bordered w-full max-w-xs"
			/>
			{meta.touched && meta.error && <span>{meta.error}</span>}
		</div>
	);
}

function TextAreaInputField(
	props: FieldRenderProps<any, HTMLElement, any> & { label: string }
) {
	const { input, meta, label } = props;
	return (
		<div className="grid gap-1">
			<label
				className={classNames(
					"text-xs font-medium transition-opacity ease-in-out",
					input.value ? "opacity-100" : "opacity-0"
				)}
			>
				{label}
			</label>
			<textarea
				placeholder={label}
				{...input}
				className="textarea textarea-bordered"
			></textarea>

			{meta.touched && meta.error && <span>{meta.error}</span>}
		</div>
	);
}

function SelectInputField(
	props: FieldRenderProps<any, HTMLElement, any> & {
		label: string;
		options: string[];
	}
) {
	const { input, meta, label, options } = props;
	return (
		<div className="grid gap-1">
			<label className="text-xs font-medium">{label}</label>
			<select {...input} className="select select-bordered w-full max-w-xs">
				{options.map((opt) => (
					<option key={opt}>{opt}</option>
				))}
			</select>
			{meta.touched && meta.error && <span>{meta.error}</span>}
		</div>
	);
}

interface ICreationFormProps {
	onSubmit: (values: IDevice) => void;
	onClickClose: React.DOMAttributes<HTMLButtonElement>["onClick"];
}

export default function CreationForm(props: ICreationFormProps) {
	const { onSubmit, onClickClose } = props;
	return (
		<div
			className="card bg-white rounded-md flex w-fit m-auto p-12 relative"
			onClick={(ev) => ev.stopPropagation()}
		>
			<button
				className="btn btn-circle btn-ghost absolute left-1 top-1"
				onClick={onClickClose}
			>
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>
			<h4 className="text-xl font-bold">Creation Form</h4>
			<Form
				onSubmit={onSubmit}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} className="grid gap-2 w-80">
						<div className="grid grid-flow-col gap-2">
							<Field
								name="firstName"
								render={(props) => (
									<TextInputField label="First Name" {...props} />
								)}
							/>
							<Field
								name="lastName"
								render={(props) => (
									<TextInputField label="Last Name" {...props} />
								)}
							/>
						</div>
						<div className="grid grid-flow-col gap-2">
							<Field
								name="latitude"
								type="number"
								render={(props) => (
									<TextInputField label="Latitude" {...props} />
								)}
							/>
							<Field
								name="longitude"
								type="number"
								render={(props) => (
									<TextInputField label="Longitude" {...props} />
								)}
							/>
						</div>

						<Field
							name="description"
							render={(props) => (
								<TextAreaInputField label="Description" {...props} />
							)}
						/>
						<Field
							name="parentOrg"
							render={(props) => (
								<TextInputField label="Parent Org" {...props} />
							)}
						/>
						<div className="grid grid-flow-col gap-2">
							<Field
								name="role"
								defaultValue="admin"
								render={(props) => (
									<SelectInputField
										label="Role"
										options={["admin", "read", "write"]}
										{...props}
									/>
								)}
							/>
							<Field
								name="type"
								defaultValue="modem"
								render={(props) => (
									<SelectInputField
										label="Type"
										options={["modem", "tv", "phone"]}
										{...props}
									/>
								)}
							/>
						</div>

						<Field
							name="phoneNumber"
							render={(props) => (
								<TextInputField label="Phone Number" {...props} />
							)}
						/>
						<button className="btn btn-neutral" type="submit">
							Submit
						</button>
					</form>
				)}
			/>
		</div>
	);
}
