import { Button } from "@/components/ui/button";
import { getFeaturedAgents, removeFeaturedAgent, getCategories, getUserAgents, getAllAgents, getNotFeaturedAgents } from "./actions";


import FeaturedAgentsTable from "./FeaturedAgentsTable";
import { AdminAddFeaturedAgentDialog } from "./AdminAddFeaturedAgentDialog";


export default async function AdminFeaturedAgentsControl({
  className,
}: {
  className?: string;
}) {
  // add featured agent button
  //   modal to select agent?
  //   modal to select categories?
  // table of featured agents
  // in table
  //    remove featured agent button
  //    edit featured agent categories button
  // table footer
  //    Next page button
  //    Previous page button
  //    Page number input
  //    Page size input
  //    Total pages input
  //    Go to page button

  const page = 1;
  const pageSize = 10;

  const agents = await getFeaturedAgents(page, pageSize);

  const categories = await getCategories();

  const notFeaturedAgents = await getNotFeaturedAgents();

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="mb-4 flex justify-between">
        <h3 className="text-lg font-semibold">Featured Agent Controls</h3>
        <AdminAddFeaturedAgentDialog categories={categories.unique_categories} agents={notFeaturedAgents.agents} />
      </div>
      <FeaturedAgentsTable agents={agents.agents} globalActions={[
        {
          component: (
            <Button>
              Remove
            </Button>
          ),
          action: async (rows) => {
            "use server";
            const all = rows.map((row) => removeFeaturedAgent(row.id));
            await Promise.all(all);
          },
        },

      ]} />
    </div >
  );
}

// Function to handle adding the featured agent
async function addFeaturedAgent(agentId: string, categories: string[]) {
  // Implement the logic to add the featured agent
  // This could involve calling an API or updating state
}
