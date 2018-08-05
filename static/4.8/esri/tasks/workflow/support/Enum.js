// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["dojo/_base/declare","../../../core/kebabDictionary"],function(b,a){return b(null,{declaredClass:"esri.tasks.workflow.support.Enum",changeConditionJsonDict:a({0:"always",1:"changed-from",2:"changed-to"}),changeTypeJsonDict:a({1:"add",2:"modify",4:"delete",7:"all"}),compareOperatorJsonDict:a({0:"equal",1:"not-equal",2:"greater-than",3:"greater-or-equal",4:"less-than",5:"less-or-equal",6:"contains"}),extendedPropertyDisplayTypeJsonDict:a({0:"default",1:"text",2:"date",4:"domain",5:"file",6:"geo-file",
7:"folder",8:"list",9:"table-list",10:"multi-level-table-list"}),fieldTypeJsonDict:a({0:"small-integer",1:"integer",2:"single",3:"double",4:"string",5:"date",6:"oid",7:"geometry",8:"blob",9:"raster",10:"guid",11:"global-id",12:"xml"}),jobAssignmentTypeJsonDict:a({"-1":"none",0:"unassigned",1:"user",2:"group"}),jobAttachmentTypeJsonDict:a({1:"linked-file",2:"embedded",3:"url"}),jobDependencyTypeJsonDict:a({1:"step",2:"stage",3:"status"}),jobTypeStateJsonDict:a({0:"draft",1:"active",2:"retired"}),jobStageJsonDict:a({"-1":"none",
1:"created",2:"ready",3:"working",4:"done",5:"closed"}),spatialRelJsonDict:a({esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"}),stepDescriptionTypeJsonDict:a({1:"none",2:"embedded-html",3:"link"}),stepExecutionResultJsonDict:a({1:"executed",
2:"dependent-on-step",3:"dependent-on-stage",4:"dependent-on-status",5:"job-on-hold",6:"step-depends-on-step",7:"check",8:"step-assigned-to-other-user",9:"step-assigned-to-other-group",10:"job-assigned-to-others",11:"job-closed",12:"invalid-platform",13:"invalid-step",14:"dependent-on-job",15:"not-current-step"}),stepExecutionTypeJsonDict:a({1:"executable",2:"function",3:"procedural",4:"launch-url",5:"question",6:"open-file"}),stepIndicatorTypeJsonDict:a({1:"rounded-rectangle",2:"rectangle",3:"oval",
4:"diamond",5:"parallelogram"}),stepPlatformTypeJsonDict:a({0:"desktop",1:"server",2:"both"}),stepRunnableStatusJsonDict:a({1:"can-run",2:"dependent-on-step",3:"dependent-on-stage",4:"dependent-on-status",5:"job-on-hold",6:"step-depends-on-step",8:"step-assigned-to-other-user",9:"step-assigned-to-other-group",10:"job-assigned-to-others",11:"job-closed",12:"invalid-platform",13:"invalid-step",14:"dependent-on-job",15:"not-current-step"}),tableRelationshipTypeJsonDict:a({1:"one-to-one",2:"one-to-many"})})});