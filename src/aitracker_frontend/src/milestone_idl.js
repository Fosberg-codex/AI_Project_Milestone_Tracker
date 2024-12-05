export const idlFactory = ({ IDL }) => {
    const Status = IDL.Variant({
      NotStarted: IDL.Null,
      InProgress: IDL.Null,
      Completed: IDL.Null
    });
  
    const Milestone = IDL.Record({
      id: IDL.Nat,
      title: IDL.Text,
      description: IDL.Text,
      completionDate: IDL.Int,
      status: Status
    });
  
    return IDL.Service({
      createMilestone: IDL.Func([IDL.Text, IDL.Text, IDL.Int], [IDL.Text], []),
      updateMilestoneStatus: IDL.Func([IDL.Nat, Status], [IDL.Text], []),
      getMilestones: IDL.Func([], [IDL.Vec(Milestone)], ["query"]),
      removeMilestone: IDL.Func([IDL.Nat], [IDL.Text], [])
    });
  };
  
  export const init = ({ IDL }) => {
    return [];
  };