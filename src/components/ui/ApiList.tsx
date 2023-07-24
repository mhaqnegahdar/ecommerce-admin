// Hooks / Packages
import { useParams } from "next/navigation";
import { useOrigin } from "@/hooks/useOrigin";

// Components
import ApiAlert from "./ApiAlert";

// Types
import { ApiListProps } from "@/types/props";

const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        variant="public"
        title="GET"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        variant="public"
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        variant="admin"
        title="POST"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        variant="admin"
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        variant="admin"
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

export default ApiList;
