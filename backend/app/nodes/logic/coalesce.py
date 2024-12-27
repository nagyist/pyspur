from typing import Dict, Optional, List
from pydantic import BaseModel, create_model
from ..base import BaseNodeConfig, BaseNode, BaseNodeInput, BaseNodeOutput


class CoalesceNodeConfig(BaseNodeConfig):
    """Configuration for the coalesce node."""

    preferences: List[str] = []


class CoalesceNodeInput(BaseNodeInput):
    """Input model for the coalesce node."""

    pass


class CoalesceNodeOutput(BaseNodeOutput):
    """Output model for the coalesce node."""

    class Config:
        arbitrary_types_allowed = True

    pass


class CoalesceNode(BaseNode):
    """
    A Coalesce node that takes multiple incoming branches and outputs
    the first non-null branch's value as its result.
    """

    name = "coalesce_node"
    display_name = "Coalesce"
    input_model = CoalesceNodeInput
    config_model = CoalesceNodeConfig

    async def run(self, input: BaseModel) -> BaseModel:
        """
        The `input` here is typically a Pydantic model whose fields correspond
        to each upstream dependency. Some may be None, some may be a valid
        BaseModel/dict. We find the first non-None field and return it.
        """
        self.output_model = CoalesceNodeOutput

        data = input.model_dump()
        print(f"Received input data: {data}")
        first_non_null_output: Dict[str, Optional[BaseModel]] = {}

        # Iterate over the keys based on the order specified in preferences
        for key in self.config.preferences:  # {{ edit_1 }}
            if key in data and data[key] is not None:
                # Return the first non-None value according to preferences
                output_model = create_model(  # type: ignore
                    f"{self.name}",
                    **{
                        k: (type(v), ...) for k, v in data[key].items()
                    },  # Only include the first non-null key # type: ignore
                    __base__=CoalesceNodeOutput,
                )
                self.output_model = output_model
                first_non_null_output = data[key]
                print(f"Returning first non-null value: {key}, {data[key]}")
                return self.output_model(**first_non_null_output)  # type: ignore

        # If all preferred values are None, check the rest of the data
        for key, value in data.items():
            if value is not None:
                # Return the first non-None value immediately
                output_model = create_model(  # type: ignore
                    f"{self.name}",
                    **{
                        key: (type(value), ...)
                    },  # Only include the first non-null key # type: ignore
                    __base__=CoalesceNodeOutput,
                )
                self.output_model = output_model
                first_non_null_output[key] = value
                print(f"Returning first non-null value: {key}, {value}")
                return self.output_model(**first_non_null_output)  # type: ignore

        # If all values are None, return an empty output
        return self.output_model(**first_non_null_output)  # type: ignore