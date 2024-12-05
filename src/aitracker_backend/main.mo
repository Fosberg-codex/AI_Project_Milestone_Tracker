import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Order "mo:base/Order";

actor {
  // Define the status type
  public type Status = {
    #NotStarted;
    #InProgress;
    #Completed;
  };

  // Define the Milestone type
  public type Milestone = {
    id: Text;
    title: Text;
    description: Text;
    completionDate: Int;
    status: Status;
  };

  // Create a stable HashMap to store milestones
  stable var milestoneEntries : [(Text, Milestone)] = [];
  let milestones = HashMap.HashMap<Text, Milestone>(0, Text.equal, Text.hash);

  // Counter for generating unique IDs
  stable var nextId : Nat = 0;

  // Generate a unique ID
  func generateUniqueId() : Text {
    nextId += 1;
    return Nat.toText(nextId);
  };

  // Create a new milestone
  public shared(msg) func createMilestone(title : Text, description : Text, completionDate : Int) : async Milestone {
    let id = generateUniqueId();
    let newMilestone : Milestone = {
      id = id;
      title = title;
      description = description;
      completionDate = completionDate;
      status = #NotStarted;
    };
    milestones.put(id, newMilestone);
    return newMilestone;
  };

  // Update milestone status
  public shared(msg) func updateMilestoneStatus(id : Text, newStatus : Status) : async ?Milestone {
    switch (milestones.get(id)) {
      case null { null };
      case (?milestone) {
        let updatedMilestone : Milestone = {
          id = milestone.id;
          title = milestone.title;
          description = milestone.description;
          completionDate = milestone.completionDate;
          status = newStatus;
        };
        milestones.put(id, updatedMilestone);
        ?updatedMilestone;
      };
    };
  };

  // Get all milestones
  public query func getAllMilestones() : async [Milestone] {
    let buffer = Buffer.Buffer<Milestone>(0);
    for (milestone in milestones.vals()) {
      buffer.add(milestone);
    };
    return Array.sort<Milestone>(
      Buffer.toArray(buffer),
      func(a: Milestone, b: Milestone) : Order.Order { 
        if (a.completionDate < b.completionDate) { #less } 
        else if (a.completionDate > b.completionDate) { #greater } 
        else { #equal }
      }
    );
  };

  // Delete a milestone
  public shared(msg) func deleteMilestone(id : Text) : async Bool {
    switch (milestones.get(id)) {
      case null { false };
      case (?milestone) {
        milestones.delete(id);
        true;
      };
    };
  };

  // Preupgrade and postupgrade hooks to maintain state
  system func preupgrade() {
    milestoneEntries := Iter.toArray(milestones.entries());
  };

  system func postupgrade() {
    for ((id, milestone) in milestoneEntries.vals()) {
      milestones.put(id, milestone);
    };
    milestoneEntries := [];
  };
}


//actor {
//  public query func greet(name : Text) : async Text {
//    return "Hello, " # name # "!";
//  };
// };
