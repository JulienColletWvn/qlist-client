import { api } from "./api";

export const extendedApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;

/**
 * 
 * Content       []LocalisedTextContent `json:"name" gorm:"polymorphic:Content" validate:"required"`
StartDate     *time.Time             `json:"start_date" gorm:"not null" validate:"required"`
EndDate       *time.Time             `json:"end_date" gorm:"not null" validate:"required"`
Location      string                 `json:"location" gorm:"not null" validate:"required"`
FreeWifi      bool                   `json:"free_wifi"`
Public        bool                   `json:"public" gorm:"not null"`
TicketsAmount int                    `json:"tickets_amount"`
Status        string                 `json:"status"`


 * 
 * 
 */
